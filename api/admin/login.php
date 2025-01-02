<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Include necessary files
include_once '../../config/database.php';

// Receive JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Hardcoded admin credentials (replace with database-backed authentication later)
$ADMIN_USERNAME = 'admin';
$ADMIN_PASSWORD = 'kanda_filme_2024!'; // Use a strong, unique password

// Function to generate a secure token
function generateToken($username) {
    return hash('sha256', $username . time() . rand(1000, 9999));
}

// Validate credentials
if (
    isset($data['username']) && 
    isset($data['password']) && 
    $data['username'] === $ADMIN_USERNAME && 
    $data['password'] === $ADMIN_PASSWORD
) {
    // Generate a token
    $token = generateToken($data['username']);
    
    // In a real-world scenario, you would:
    // 1. Store this token in a database
    // 2. Set an expiration time
    // 3. Implement token validation on each admin request

    http_response_code(200);
    echo json_encode([
        'success' => true, 
        'message' => 'Login successful', 
        'token' => $token
    ]);
} else {
    http_response_code(401);
    echo json_encode([
        'success' => false, 
        'message' => 'Invalid credentials'
    ]);
}
?>
