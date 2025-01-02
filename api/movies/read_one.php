<?php
// Headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Include database and movie object
include_once '../../config/database.php';
include_once '../../models/Movie.php';

// Initialize database and movie object
$database = new Database();
$db = $database->getConnection();
$movie = new Movie($db);

// Set movie ID
$movie->movie_id = isset($_GET['id']) ? $_GET['id'] : die();

// Read the details of movie to be edited
if($movie->readOne()) {
    // Create array
    $movie_arr = array(
        "movie_id" => $movie->movie_id,
        "title" => array(
            "en" => $movie->title_en,
            "fr" => $movie->title_fr,
            "rw" => $movie->title_rw
        ),
        "description" => array(
            "en" => $movie->description_en,
            "fr" => $movie->description_fr,
            "rw" => $movie->description_rw
        ),
        "poster_image" => $movie->poster_image,
        "backdrop_image" => $movie->backdrop_image,
        "trailer_url" => $movie->trailer_url,
        "release_year" => $movie->release_year,
        "rating" => $movie->rating,
        "views" => $movie->views,
        "duration" => $movie->duration
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

    $movie_arr["similar_movies"] = $similar_movies;

    // Increment view count
    $movie->incrementViews();

    // Set response code - 200 OK
    http_response_code(200);

    // Make it json format
    echo json_encode($movie_arr);
} else {
    // Set response code - 404 Not found
    http_response_code(404);

    // Tell the user movie does not exist
    echo json_encode(array("message" => "Movie does not exist."));
}
?>
