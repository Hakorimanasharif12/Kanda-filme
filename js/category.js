// Sample movie data for different sections
const movieData = {
    topMovies: [
        {
            title: "The Dark Knight",
            image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
            rating: 9.2,
            views: "2.5M",
            category: "Action"
        },
        {
            title: "Inception",
            image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
            rating: 8.8,
            views: "2.1M",
            category: "Action"
        },
        {
            title: "Interstellar",
            image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
            rating: 8.6,
            views: "1.9M",
            category: "Sci-Fi"
        },
        {
            title: "The Matrix",
            image: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
            rating: 8.7,
            views: "2.3M",
            category: "Action"
        },
        {
            title: "Gladiator",
            image: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
            rating: 8.5,
            views: "1.8M",
            category: "Action"
        },
        {
            title: "Mad Max: Fury Road",
            image: "https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
            rating: 8.1,
            views: "1.7M",
            category: "Action"
        }
    ],
    mostWatched: [
        {
            title: "Avengers: Endgame",
            image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
            rating: 8.4,
            views: "3.2M",
            category: "Action"
        },
        {
            title: "Avatar",
            image: "https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
            rating: 7.8,
            views: "2.9M",
            category: "Sci-Fi"
        },
        {
            title: "Top Gun: Maverick",
            image: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
            rating: 8.3,
            views: "2.7M",
            category: "Action"
        },
        {
            title: "Black Panther",
            image: "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
            rating: 7.3,
            views: "2.6M",
            category: "Action"
        },
        {
            title: "Spider-Man: No Way Home",
            image: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
            rating: 8.2,
            views: "2.8M",
            category: "Action"
        },
        {
            title: "The Batman",
            image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
            rating: 7.8,
            views: "2.4M",
            category: "Action"
        }
    ],
    lovedMovies: [
        {
            title: "The Shawshank Redemption",
            image: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
            rating: 9.3,
            views: "2.2M",
            category: "Drama"
        },
        {
            title: "Pulp Fiction",
            image: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
            rating: 8.9,
            views: "2.0M",
            category: "Crime"
        },
        {
            title: "The Godfather",
            image: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
            rating: 9.2,
            views: "1.9M",
            category: "Crime"
        },
        {
            title: "Fight Club",
            image: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
            rating: 8.8,
            views: "1.8M",
            category: "Drama"
        },
        {
            title: "Forrest Gump",
            image: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
            rating: 8.8,
            views: "2.1M",
            category: "Drama"
        },
        {
            title: "The Lord of the Rings",
            image: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
            rating: 8.9,
            views: "2.0M",
            category: "Fantasy"
        }
    ]
};

// Current page number
let currentPage = 1;
const itemsPerPage = 6;

// Function to create a movie card
function createMovieCard(movie) {
    return `
        <div class="movie-card">
            <img src="${movie.image}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <span class="rating"><i class="fas fa-star"></i> ${movie.rating}</span>
                <span class="views"><i class="fas fa-eye"></i> ${movie.views}</span>
            </div>
            <div class="movie-overlay">
                <button class="watch-now" data-translate="watchNow">Watch Now</button>
            </div>
        </div>
    `;
}

// Function to display movies for a section
function displayMovies(sectionId, movies, page = 1) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const movieSection = document.getElementById(sectionId);
    
    if (movieSection) {
        movieSection.innerHTML = movies
            .slice(startIndex, endIndex)
            .map(movie => createMovieCard(movie))
            .join('');
    }
}

// Function to update pagination
function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbers = document.querySelector('.page-numbers');
    let paginationHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `<span class="page-number ${i === currentPage ? 'active' : ''}">${i}</span>`;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += `<span class="page-dots">...</span>`;
        }
    }

    pageNumbers.innerHTML = paginationHTML;

    // Add click events to page numbers
    document.querySelectorAll('.page-number').forEach(button => {
        button.addEventListener('click', () => {
            currentPage = parseInt(button.textContent);
            loadMovies();
        });
    });
}

// Function to load movies based on current filters and page
function loadMovies() {
    const sortBy = document.getElementById('sort-by').value;
    let movies = [...movieData.topMovies]; // Default to top movies

    // Sort movies based on selection
    switch (sortBy) {
        case 'latest':
            movies.sort((a, b) => b.views.localeCompare(a.views));
            break;
        case 'popular':
            movies.sort((a, b) => parseFloat(b.views) - parseFloat(a.views));
            break;
        case 'rating':
            movies.sort((a, b) => b.rating - a.rating);
            break;
    }

    displayMovies('top-movies', movieData.topMovies);
    displayMovies('most-watched', movieData.mostWatched);
    displayMovies('loved-movies', movieData.lovedMovies);
    updatePagination(movies.length);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Load initial movies
    loadMovies();

    // Add event listeners
    document.getElementById('sort-by').addEventListener('change', loadMovies);
    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            loadMovies();
        }
    });
    document.getElementById('next-page').addEventListener('click', () => {
        const totalPages = Math.ceil(movieData.topMovies.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            loadMovies();
        }
    });
});
