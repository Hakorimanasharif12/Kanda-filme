<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../../config/database.php';
include_once '../../models/Movie.php';

$database = new Database();
$db = $database->getConnection();

$movie = new Movie($db);

// Get search query
$searchQuery = isset($_GET['query']) ? $_GET['query'] : '';

if (empty($searchQuery)) {
    http_response_code(400);
    echo json_encode(["error" => "Search query is required"]);
    exit();
}

try {
    $stmt = $movie->search($searchQuery);
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($results) > 0) {
        http_response_code(200);
        echo json_encode($results);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "No movies found"]);
    }
} catch(Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>
