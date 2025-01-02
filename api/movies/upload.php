<?php
session_start();
require_once '../../config/database.php';

// Check if admin is logged in
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    http_response_code(403);
    echo json_encode(["error" => "Unauthorized access"]);
    exit();
}

// Database connection
$database = new Database();
$conn = $database->getConnection();

// File upload handling
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Poster image upload
        $poster_path = '';
        if (isset($_FILES['poster']) && $_FILES['poster']['error'] === UPLOAD_ERR_OK) {
            $poster_tmp = $_FILES['poster']['tmp_name'];
            $poster_name = uniqid() . '_' . $_FILES['poster']['name'];
            $poster_path = 'uploads/posters/' . $poster_name;
            move_uploaded_file($poster_tmp, '../../' . $poster_path);
        }

        // Video file upload
        $video_path = '';
        if (isset($_FILES['video']) && $_FILES['video']['error'] === UPLOAD_ERR_OK) {
            $video_tmp = $_FILES['video']['tmp_name'];
            $video_name = uniqid() . '_' . $_FILES['video']['name'];
            $video_path = 'uploads/videos/' . $video_name;
            move_uploaded_file($video_tmp, '../../' . $video_path);
        }

        // Prepare SQL to insert movie
        $stmt = $conn->prepare("INSERT INTO movies 
            (title_en, title_local, description_en, description_local, 
            category, poster_image, video_file, release_year, duration, is_featured) 
            VALUES 
            (:title_en, :title_local, :description_en, :description_local, 
            :category, :poster_image, :video_file, :release_year, :duration, :is_featured)");

        $stmt->execute([
            ':title_en' => $_POST['title_en'],
            ':title_local' => $_POST['title_local'] ?? null,
            ':description_en' => $_POST['description_en'],
            ':description_local' => $_POST['description_local'] ?? null,
            ':category' => $_POST['category'],
            ':poster_image' => $poster_path,
            ':video_file' => $video_path,
            ':release_year' => $_POST['release_year'],
            ':duration' => $_POST['duration'],
            ':is_featured' => isset($_POST['is_featured']) ? 1 : 0
        ]);

        http_response_code(201);
        echo json_encode(["message" => "Movie uploaded successfully"]);
    } catch(Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method Not Allowed"]);
}
?>
