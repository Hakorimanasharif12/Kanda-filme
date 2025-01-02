<?php
class Movie {
    private $conn;
    private $table_name = "movies";

    // Movie properties
    public $movie_id;
    public $title_en;
    public $title_fr;
    public $title_rw;
    public $description_en;
    public $description_fr;
    public $description_rw;
    public $poster_image;
    public $backdrop_image;
    public $trailer_url;
    public $release_year;
    public $rating;
    public $views;
    public $duration;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Read all movies with pagination
    public function read($page = 1, $per_page = 12) {
        $offset = ($page - 1) * $per_page;
        
        $query = "SELECT * FROM " . $this->table_name . "
                ORDER BY created_at DESC
                LIMIT :limit OFFSET :offset";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":limit", $per_page, PDO::PARAM_INT);
        $stmt->bindParam(":offset", $offset, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt;
    }

    // Read single movie
    public function readOne() {
        $query = "SELECT m.*, GROUP_CONCAT(c.slug) as categories
                FROM " . $this->table_name . " m
                LEFT JOIN movie_categories mc ON m.movie_id = mc.movie_id
                LEFT JOIN categories c ON mc.category_id = c.category_id
                WHERE m.movie_id = ?
                GROUP BY m.movie_id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->movie_id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if($row) {
            $this->title_en = $row['title_en'];
            $this->title_fr = $row['title_fr'];
            $this->title_rw = $row['title_rw'];
            $this->description_en = $row['description_en'];
            $this->description_fr = $row['description_fr'];
            $this->description_rw = $row['description_rw'];
            $this->poster_image = $row['poster_image'];
            $this->backdrop_image = $row['backdrop_image'];
            $this->trailer_url = $row['trailer_url'];
            $this->release_year = $row['release_year'];
            $this->rating = $row['rating'];
            $this->views = $row['views'];
            $this->duration = $row['duration'];
            
            return true;
        }
        
        return false;
    }

    // Get similar movies
    public function getSimilarMovies($limit = 4) {
        $query = "SELECT DISTINCT m.*
                FROM " . $this->table_name . " m
                INNER JOIN movie_categories mc1 ON m.movie_id = mc1.movie_id
                INNER JOIN movie_categories mc2 ON mc1.category_id = mc2.category_id
                WHERE mc2.movie_id = :movie_id
                AND m.movie_id != :movie_id
                ORDER BY m.rating DESC
                LIMIT :limit";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":movie_id", $this->movie_id);
        $stmt->bindParam(":limit", $limit, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt;
    }

    // Search movies
    public function search($keyword, $page = 1, $per_page = 12) {
        $offset = ($page - 1) * $per_page;
        $keyword = "%{$keyword}%";

        $query = "SELECT * FROM " . $this->table_name . "
                WHERE title_en LIKE :keyword
                OR title_fr LIKE :keyword
                OR title_rw LIKE :keyword
                OR description_en LIKE :keyword
                OR description_fr LIKE :keyword
                OR description_rw LIKE :keyword
                ORDER BY rating DESC
                LIMIT :limit OFFSET :offset";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":keyword", $keyword);
        $stmt->bindParam(":limit", $per_page, PDO::PARAM_INT);
        $stmt->bindParam(":offset", $offset, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt;
    }

    // Filter movies by category
    public function filterByCategory($category_slug, $page = 1, $per_page = 12) {
        $offset = ($page - 1) * $per_page;

        $query = "SELECT m.* FROM " . $this->table_name . " m
                INNER JOIN movie_categories mc ON m.movie_id = mc.movie_id
                INNER JOIN categories c ON mc.category_id = c.category_id
                WHERE c.slug = :category
                ORDER BY m.created_at DESC
                LIMIT :limit OFFSET :offset";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":category", $category_slug);
        $stmt->bindParam(":limit", $per_page, PDO::PARAM_INT);
        $stmt->bindParam(":offset", $offset, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt;
    }

    // Increment view count
    public function incrementViews() {
        $query = "UPDATE " . $this->table_name . "
                SET views = views + 1
                WHERE movie_id = :movie_id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":movie_id", $this->movie_id);
        
        return $stmt->execute();
    }
}
?>
