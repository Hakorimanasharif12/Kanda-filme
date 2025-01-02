<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../config/database.php';
include_once '../../models/Movie.php';

$database = new Database();
$db = $database->getConnection();

$movie = new Movie($db);

// Function to handle file upload
function uploadFile($file, $uploadDir, $allowedTypes, $maxSize) {
    // Check file size
    if ($file['size'] > $maxSize) {
        return ['success' => false, 'message' => 'File too large'];
    }

    // Check file type
    $fileType = mime_content_type($file['tmp_name']);
    if (!in_array($fileType, $allowedTypes)) {
        return ['success' => false, 'message' => 'Invalid file type'];
    }

    // Generate unique filename
    $fileName = uniqid() . '_' . basename($file['name']);
    $targetPath = $uploadDir . $fileName;

    // Move uploaded file
    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        return [
            'success' => true, 
            'message' => 'File uploaded successfully', 
            'filename' => $fileName
        ];
    }

    return ['success' => false, 'message' => 'File upload failed'];
}

// Validate and process inputs
if (
    !empty($_POST['title']) && 
    !empty($_POST['description']) && 
    !empty($_POST['category']) && 
    isset($_FILES['poster']) && 
    isset($_FILES['video'])
) {
    // Upload poster image
    $posterUpload = uploadFile(
        $_FILES['poster'], 
        '../../uploads/posters/', 
        ['image/jpeg', 'image/png', 'image/gif'], 
        5 * 1024 * 1024 // 5MB
    );

    // Upload video
    $videoUpload = uploadFile(
        $_FILES['video'], 
        '../../uploads/videos/', 
        ['video/mp4'], 
        500 * 1024 * 1024 // 500MB
    );

    if (!$posterUpload['success'] || !$videoUpload['success']) {
        http_response_code(400);
        echo json_encode([
            'success' => false, 
            'message' => $posterUpload['message'] . ' ' . $videoUpload['message']
        ]);
        exit();
    }

    // Set movie properties
    $movie->title = htmlspecialchars(strip_tags($_POST['title']));
    $movie->description = htmlspecialchars(strip_tags($_POST['description']));
    $movie->category = htmlspecialchars(strip_tags($_POST['category']));
    $movie->poster = 'uploads/posters/' . $posterUpload['filename'];
    $movie->video = 'uploads/videos/' . $videoUpload['filename'];
    
    // Optional trailer URL
    $movie->trailer_url = !empty($_POST['trailer']) 
        ? htmlspecialchars(strip_tags($_POST['trailer'])) 
        : null;

    // Create movie record
    if ($movie->create()) {
        http_response_code(201);
        echo json_encode([
            'success' => true, 
            'message' => 'Movie created successfully.'
        ]);
    } else {
        http_response_code(503);
        echo json_encode([
            'success' => false, 
            'message' => 'Unable to create movie.'
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => 'Incomplete movie data.'
    ]);
}
?>
