// Get movie ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// Function to load movie details
function loadMovieDetails() {
    const movie = allMovies[movieId];
    if (!movie) {
        window.location.href = 'movies.html';
        return;
    }

    // Update page title
    document.title = `${getTranslation(movie.title)} - Kanda Filme`;

    // Set movie backdrop
    const backdrop = document.querySelector('.movie-backdrop');
    backdrop.style.backgroundImage = `url(${movie.image})`;

    // Set movie poster
    document.getElementById('movie-poster').src = movie.image;
    document.getElementById('movie-poster').alt = getTranslation(movie.title);

    // Set movie details
    document.getElementById('movie-title').textContent = getTranslation(movie.title);
    document.getElementById('movie-rating').textContent = movie.rating;
    document.getElementById('movie-views').textContent = movie.views;
    document.getElementById('movie-year').textContent = movie.year;
    document.getElementById('movie-category').textContent = movie.category;
    document.getElementById('movie-description').textContent = getTranslation(movie.description);

    // Load similar movies
    loadSimilarMovies(movie.category);
}

// Function to load similar movies
function loadSimilarMovies(category) {
    const similarMoviesContainer = document.getElementById('similar-movies');
    const similarMovies = allMovies
        .filter(movie => movie.category === category && allMovies.indexOf(movie) != movieId)
        .slice(0, 4);

    similarMoviesContainer.innerHTML = '';
    similarMovies.forEach(movie => {
        const movieCard = createMovieCard(movie, allMovies.indexOf(movie));
        similarMoviesContainer.appendChild(movieCard);
    });
}

// Function to create movie card
function createMovieCard(movie, index) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
        <div class="movie-thumbnail">
            <img src="${movie.image}" alt="${getTranslation(movie.title)}">
            <button class="play-button" onclick="playTrailer('${movie.trailer}')">
                <i class="fas fa-play"></i>
            </button>
        </div>
        <div class="movie-info">
            <h3>${getTranslation(movie.title)}</h3>
            <p>${getTranslation(movie.description)}</p>
            <div class="movie-stats">
                <span class="rating"><i class="fas fa-star"></i> ${movie.rating}</span>
                <span class="views"><i class="fas fa-eye"></i> ${movie.views}</span>
            </div>
        </div>
    `;
    card.addEventListener('click', () => {
        window.location.href = `movie-template.html?id=${index}`;
    });
    return card;
}

// Function to play movie
function playMovie() {
    const movie = allMovies[movieId];
    const videoContainer = document.getElementById('video-container');
    videoContainer.classList.add('active');
    videoContainer.innerHTML = `<iframe src="${movie.trailer}" allowfullscreen></iframe>`;
    videoContainer.scrollIntoView({ behavior: 'smooth' });
}

// Event listeners
document.getElementById('play-movie').addEventListener('click', playMovie);

// Load movie details when page loads
window.addEventListener('load', () => {
    loadMovieDetails();
    updateLanguageSelect();
});
