<?php
// Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// Include database and movie object
include_once '../../config/database.php';
include_once '../../models/Movie.php';

// Initialize database and movie object
$database = new Database();
$db = $database->getConnection();
$movie = new Movie($db);

// Set movie ID
$movie->movie_id = isset($_GET['id']) ? $_GET['id'] : die();

// Read the details of a specific movie
$stmt = $movie->readOne();

if($stmt->rowCount() > 0) {
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Create movie details array
    $movie_details = array(
        "movie_id" => $row['movie_id'],
        "title_en" => $row['title_en'],
        "description_en" => $row['description_en'],
        "category" => $row['category'],
        "poster_image" => $row['poster_image'],
        "video_file" => $row['video_file'],
        "trailer_url" => $row['trailer_url']
    );

    // Get similar movies
    $similar_stmt = $movie->getSimilarMovies();
    $similar_movies = array();

    while($row = $similar_stmt->fetch(PDO::FETCH_ASSOC)) {
        $similar_movie = array(
            "movie_id" => $row['movie_id'],
            "title" => array(
                "en" => $row['title_en'],
                "fr" => $row['title_fr'],
                "rw" => $row['title_rw']
            ),
            "poster_image" => $row['poster_image'],
            "rating" => $row['rating']
        );
        array_push($similar_movies, $similar_movie);
    }

    $movie_details["similar_movies"] = $similar_movies;

    // Increment view count
    $movie->incrementViews();

    // Set response code - 200 OK
    http_response_code(200);

    // Make it json format
    echo json_encode($movie_details);
} else {
    // Set response code - 404 Not found
    http_response_code(404);

    // Tell the user movie does not exist
    echo json_encode(array("message" => "Movie does not exist."));
}
?>
