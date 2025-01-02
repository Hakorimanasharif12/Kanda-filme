-- Create Movies Table
CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title_en VARCHAR(255) NOT NULL,
    title_local VARCHAR(255),
    description_en TEXT,
    description_local TEXT,
    category VARCHAR(50),
    poster_image VARCHAR(255),
    video_file VARCHAR(255),
    release_year INT,
    duration INT,
    views INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Admin Users Table
CREATE TABLE admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    last_login TIMESTAMP NULL
);

-- Insert Default Admin User
INSERT INTO admin_users (username, password, email) VALUES 
('admin', MD5('12345'), 'admin@kandafilme.com');
