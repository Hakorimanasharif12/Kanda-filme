<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../config/database.php';
include_once '../../models/Movie.php';

$database = new Database();
$db = $database->getConnection();

$movie = new Movie($db);

$data = json_decode(file_get_contents("php://input"), true);

if (isset($_GET['id']) && !empty($_GET['id'])) {
    $movie->id = $_GET['id'];

    if ($movie->delete()) {
        http_response_code(200);
        echo json_encode(array("success" => true, "message" => "Movie deleted successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("success" => false, "message" => "Unable to delete movie."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("success" => false, "message" => "Invalid movie ID."));
}
?>
