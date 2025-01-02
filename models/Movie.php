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
    public $category;
    public $video_file;

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

    // Read one movie
    public function readOne() {
        $query = "SELECT 
                m.movie_id, 
                m.title_en, 
                m.description_en, 
                m.category, 
                m.poster_image, 
                m.video_file, 
                m.trailer_url,
                m.views,
                (
                    SELECT GROUP_CONCAT(s.movie_id SEPARATOR ',') 
                    FROM movies s 
                    WHERE s.category = m.category 
                    AND s.movie_id != m.movie_id 
                    LIMIT 5
                ) as similar_movie_ids
            FROM " . $this->table_name . " m
            WHERE m.movie_id = ?
            LIMIT 0,1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->movie_id);
        $stmt->execute();

        return $stmt;
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

    // Search movies
    public function searchQuery($searchQuery) {
        $query = "SELECT 
                movie_id, 
                title_en, 
                description_en, 
                category, 
                poster_image 
              FROM " . $this->table_name . "
              WHERE title_en LIKE :query 
                 OR description_en LIKE :query 
                 OR category LIKE :query
              LIMIT 10";

        $stmt = $this->conn->prepare($query);
        $searchParam = "%{$searchQuery}%";
        $stmt->bindParam(":query", $searchParam);
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

    // Get featured movies
    public function getFeaturedMovies($limit = 5) {
        $query = "SELECT 
                movie_id, 
                title_en, 
                description_en, 
                poster_image, 
                category 
              FROM " . $this->table_name . "
              WHERE is_featured = 1
              ORDER BY RAND()
              LIMIT :limit";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":limit", $limit, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt;
    }

    // Increment view count
    public function incrementViews() {
        $query = "UPDATE " . $this->table_name . "
                  SET views = views + 1
                  WHERE movie_id = ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->movie_id);
        
        return $stmt->execute();
    }

    // Create new movie
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                  SET title_en=:title_en, description_en=:description_en, 
                      category=:category, poster_image=:poster_image, 
                      video_file=:video_file, trailer_url=:trailer_url";
        
        $stmt = $this->conn->prepare($query);
        
        // Sanitize
        $this->title_en = htmlspecialchars(strip_tags($this->title_en));
        $this->description_en = htmlspecialchars(strip_tags($this->description_en));
        $this->category = htmlspecialchars(strip_tags($this->category));
        $this->poster_image = htmlspecialchars(strip_tags($this->poster_image));
        $this->video_file = htmlspecialchars(strip_tags($this->video_file));
        $this->trailer_url = $this->trailer_url ? htmlspecialchars(strip_tags($this->trailer_url)) : null;
        
        // Bind values
        $stmt->bindParam(":title_en", $this->title_en);
        $stmt->bindParam(":description_en", $this->description_en);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":poster_image", $this->poster_image);
        $stmt->bindParam(":video_file", $this->video_file);
        $stmt->bindParam(":trailer_url", $this->trailer_url);
        
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Delete movie
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE movie_id = ?";
        
        $stmt = $this->conn->prepare($query);
        
        // Sanitize
        $this->movie_id = htmlspecialchars(strip_tags($this->movie_id));
        
        // Bind id of record to delete
        $stmt->bindParam(1, $this->movie_id);
        
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>
