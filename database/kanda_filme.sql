-- Create the database
CREATE DATABASE IF NOT EXISTS kanda_filme;
USE kanda_filme;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    name_en VARCHAR(50) NOT NULL,
    name_fr VARCHAR(50) NOT NULL,
    name_rw VARCHAR(50) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create movies table
CREATE TABLE IF NOT EXISTS movies (
    movie_id INT PRIMARY KEY AUTO_INCREMENT,
    title_en VARCHAR(255) NOT NULL,
    title_fr VARCHAR(255) NOT NULL,
    title_rw VARCHAR(255) NOT NULL,
    description_en TEXT NOT NULL,
    description_fr TEXT NOT NULL,
    description_rw TEXT NOT NULL,
    poster_image VARCHAR(255) NOT NULL,
    backdrop_image VARCHAR(255),
    trailer_url VARCHAR(255),
    release_year INT,
    rating DECIMAL(3,1),
    views INT DEFAULT 0,
    duration INT, -- in minutes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create movie_categories junction table
CREATE TABLE IF NOT EXISTS movie_categories (
    movie_id INT,
    category_id INT,
    PRIMARY KEY (movie_id, category_id),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
);

-- Create watchlist table
CREATE TABLE IF NOT EXISTS watchlist (
    user_id INT,
    movie_id INT,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, movie_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE
);

-- Create ratings table
CREATE TABLE IF NOT EXISTS ratings (
    user_id INT,
    movie_id INT,
    rating INT CHECK (rating >= 1 AND rating <= 10),
    review TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, movie_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE
);

-- Create views table to track movie views
CREATE TABLE IF NOT EXISTS views (
    view_id INT PRIMARY KEY AUTO_INCREMENT,
    movie_id INT,
    user_id INT,
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

-- Insert sample categories
INSERT INTO categories (name_en, name_fr, name_rw, slug) VALUES
('Action', 'Action', 'Ibikorwa', 'action'),
('Drama', 'Drame', 'Ikinamico', 'drama'),
('Comedy', 'Comédie', 'Ibisetsa', 'comedy'),
('Sci-Fi', 'Science-Fiction', 'Siyansi', 'sci-fi'),
('Horror', 'Horreur', 'Ubwoba', 'horror'),
('Romance', 'Romance', 'Urukundo', 'romance'),
('Documentary', 'Documentaire', 'Inyigisho', 'documentary'),
('Animation', 'Animation', 'Amashusho', 'animation');

-- Insert sample movies
INSERT INTO movies (
    title_en, title_fr, title_rw,
    description_en, description_fr, description_rw,
    poster_image, trailer_url, release_year, rating
) VALUES
(
    'The Dark Knight',
    'Le Chevalier Noir',
    'Umusirikare w''Umukuru',
    'Batman raises the stakes in his war on crime in this sequel to Batman Begins.',
    'Batman augmente les enjeux dans sa guerre contre le crime dans cette suite de Batman Begins.',
    'Batman yongera imbaraga ze mu ntambara ye ku byaha muri iyi nkurikirane ya Batman Begins.',
    'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    'https://www.youtube.com/embed/EXeTwQWrcwY',
    2023,
    9.2
),
(
    'Inception',
    'Inception',
    'Inception',
    'A thief who steals corporate secrets through dream-sharing technology.',
    'Un voleur qui vole des secrets d''entreprise grâce à la technologie du partage de rêves.',
    'Umujura wiba amabanga y''ibigo akoresheje ikoranabuhanga ryo gusangira inzozi.',
    'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    'https://www.youtube.com/embed/YoHD9XEInc0',
    2023,
    8.8
);

-- Link movies to categories
INSERT INTO movie_categories (movie_id, category_id)
SELECT m.movie_id, c.category_id
FROM movies m, categories c
WHERE m.title_en = 'The Dark Knight' AND c.slug = 'action';

INSERT INTO movie_categories (movie_id, category_id)
SELECT m.movie_id, c.category_id
FROM movies m, categories c
WHERE m.title_en = 'Inception' AND c.slug = 'sci-fi';

-- Create indexes for better performance
CREATE INDEX idx_movies_title_en ON movies(title_en);
CREATE INDEX idx_movies_release_year ON movies(release_year);
CREATE INDEX idx_movies_rating ON movies(rating);
CREATE INDEX idx_views_movie_id ON views(movie_id);
CREATE INDEX idx_views_user_id ON views(user_id);
CREATE INDEX idx_watchlist_user_id ON watchlist(user_id);
CREATE INDEX idx_ratings_movie_id ON ratings(movie_id);
