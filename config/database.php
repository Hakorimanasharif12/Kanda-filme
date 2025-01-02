<?php
class Database {
    private $host = "localhost";
    private $db_name = "kanda_filme";
    private $username = "root";
    private $password = "";
    private $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            // Enable detailed error reporting
            ini_set('display_errors', 1);
            error_reporting(E_ALL);

            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_EMULATE_PREPARES => false,
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
                ]
            );
        } catch(PDOException $exception) {
            // Log the full error details
            error_log("Database Connection Error: " . $exception->getMessage());
            
            // Provide a user-friendly error message
            die("Sorry, there was a problem connecting to the database. Please try again later.");
        }

        return $this->conn;
    }

    // Optional: Add a method to check database connection
    public function testConnection() {
        try {
            $this->getConnection();
            return true;
        } catch(Exception $e) {
            return false;
        }
    }
}
?>
