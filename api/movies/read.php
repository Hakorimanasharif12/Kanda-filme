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

// Get parameters
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$per_page = isset($_GET['per_page']) ? (int)$_GET['per_page'] : 12;
$category = isset($_GET['category']) ? $_GET['category'] : null;
$search = isset($_GET['search']) ? $_GET['search'] : null;

// Get movies based on parameters
if($search) {
    $stmt = $movie->search($search, $page, $per_page);
} elseif($category) {
    $stmt = $movie->filterByCategory($category, $page, $per_page);
} else {
    $stmt = $movie->read($page, $per_page);
}

// Get total count for pagination
$total_query = $db->query("SELECT COUNT(*) as total FROM movies")->fetch();
$total_movies = $total_query['total'];
$total_pages = ceil($total_movies / $per_page);

// Check if any movies found
$num = $stmt->rowCount();

if($num > 0) {
    // Movies array
    $movies_arr = array();
    $movies_arr["records"] = array();
    $movies_arr["pagination"] = array(
        "current_page" => $page,
        "per_page" => $per_page,
        "total_pages" => $total_pages,
        "total_records" => $total_movies
    );

    // Retrieve table contents
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $movie_item = array(
            "movie_id" => $row['movie_id'],
            "title" => array(
                "en" => $row['title_en'],
                "fr" => $row['title_fr'],
                "rw" => $row['title_rw']
            ),
            "description" => array(
                "en" => $row['description_en'],
                "fr" => $row['description_fr'],
                "rw" => $row['description_rw']
            ),
            "poster_image" => $row['poster_image'],
            "backdrop_image" => $row['backdrop_image'],
            "trailer_url" => $row['trailer_url'],
            "release_year" => $row['release_year'],
            "rating" => $row['rating'],
            "views" => $row['views'],
            "duration" => $row['duration']
        );

        array_push($movies_arr["records"], $movie_item);
    }

    // Set response code - 200 OK
    http_response_code(200);

    // Show movies data in json format
    echo json_encode($movies_arr);
} else {
    // Set response code - 404 Not found
    http_response_code(404);

    // Tell the user no movies found
    echo json_encode(array("message" => "No movies found."));
}
?>
