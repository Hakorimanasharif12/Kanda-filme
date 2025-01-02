<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../../config/database.php';
include_once '../../models/Movie.php';

$database = new Database();
$db = $database->getConnection();

$movie = new Movie($db);

try {
    $stmt = $movie->getFeaturedMovies(5);
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($results) > 0) {
        http_response_code(200);
        echo json_encode($results);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "No featured movies found"]);
    }
} catch(Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>
