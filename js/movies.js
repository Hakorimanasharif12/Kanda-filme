// Movies data with translations and trailers
const allMovies = [
    {
        title: {
            en: "The Dark Knight",
            fr: "Le Chevalier Noir",
            rw: "Umusirikare w'Umukuru"
        },
        description: {
            en: "Batman raises the stakes in his war on crime in this sequel to Batman Begins.",
            fr: "Batman augmente les enjeux dans sa guerre contre le crime dans cette suite de Batman Begins.",
            rw: "Batman yongera imbaraga ze mu ntambara ye ku byaha muri iyi nkurikirane ya Batman Begins."
        },
        image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        trailer: "https://www.youtube.com/embed/EXeTwQWrcwY",
        rating: 9.2,
        views: "2.5M",
        category: "Action",
        year: 2023
    },
    {
        title: {
            en: "Inception",
            fr: "Inception",
            rw: "Inception"
        },
        description: {
            en: "A thief who steals corporate secrets through dream-sharing technology.",
            fr: "Un voleur qui vole des secrets d'entreprise grâce à la technologie du partage de rêves.",
            rw: "Umujura wiba amabanga y'ibigo akoresheje ikoranabuhanga ryo gusangira inzozi."
        },
        image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
        rating: 8.8,
        views: "2.1M",
        category: "Action",
        year: 2023
    },
    {
        title: {
            en: "Spider-Man: No Way Home",
            fr: "Spider-Man: Sans Retour",
            rw: "Spider-Man: Nta Nzira yo Gutaha"
        },
        description: {
            en: "Peter Parker seeks help from Doctor Strange to make people forget he is Spider-Man.",
            fr: "Peter Parker demande l'aide du Docteur Strange pour faire oublier aux gens qu'il est Spider-Man.",
            rw: "Peter Parker asaba ubufasha kuri Doctor Strange kugirango abantu bibagirwe ko ari Spider-Man."
        },
        image: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
        trailer: "https://www.youtube.com/embed/JfVOs4VSpmA",
        rating: 8.7,
        views: "3.1M",
        category: "Action",
        year: 2023
    },
    {
        title: {
            en: "The Matrix",
            fr: "Matrix",
            rw: "Matrix"
        },
        description: {
            en: "A computer programmer discovers a mysterious world beneath everyday reality.",
            fr: "Un programmeur informatique découvre un monde mystérieux sous la réalité quotidienne.",
            rw: "Umuhanga mu by'ikoranabuhanga abona isi itangaje munsi y'ukuri kwa buri munsi."
        },
        image: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        trailer: "https://www.youtube.com/embed/vKQi3bBA1y8",
        rating: 8.7,
        views: "2.8M",
        category: "Sci-Fi",
        year: 2023
    },
    {
        title: {
            en: "Avengers: Endgame",
            fr: "Avengers: Phase Finale",
            rw: "Avengers: Umwanzuro"
        },
        description: {
            en: "The Avengers must reunite and assemble again to restore balance to the universe.",
            fr: "Les Avengers doivent se réunir et s'assembler à nouveau pour restaurer l'équilibre de l'univers.",
            rw: "Avengers bagomba kongera guhuza no guhuza kugira ngo bagarure umudendezo mu isi."
        },
        image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        trailer: "https://www.youtube.com/embed/TcMBFSGVi1c",
        rating: 8.4,
        views: "4.2M",
        category: "Action",
        year: 2023
    },
    {
        title: {
            en: "Interstellar",
            fr: "Interstellaire",
            rw: "Interstellar"
        },
        description: {
            en: "A team of explorers travel through a wormhole in space in an attempt to save humanity.",
            fr: "Une équipe d'explorateurs voyage à travers un trou de ver dans l'espace pour tenter de sauver l'humanité.",
            rw: "Itsinda ry'abashakashatsi bagenda banyura mu mwobo wo mu kirere mu kugerageza gukiza ikiremwamuntu."
        },
        image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
        rating: 8.6,
        views: "2.9M",
        category: "Sci-Fi",
        year: 2023
    }
];

// Translations for UI elements
const translations = {
    watchNow: {
        en: "Watch Now",
        fr: "Regarder",
        rw: "Reba Nonaha"
    },
    rating: {
        en: "Rating",
        fr: "Évaluation",
        rw: "Amanota"
    },
    views: {
        en: "Views",
        fr: "Vues",
        rw: "Indebe"
    },
    allGenres: {
        en: "All Genres",
        fr: "Tous les genres",
        rw: "Ubwoko Bwose"
    },
    action: {
        en: "Action",
        fr: "Action",
        rw: "Ibikorwa"
    },
    drama: {
        en: "Drama",
        fr: "Drame",
        rw: "Ikinamico"
    },
    comedy: {
        en: "Comedy",
        fr: "Comédie",
        rw: "Ibisetsa"
    }
};

let currentFilters = {
    genre: 'all',
    year: 'all',
    sort: 'latest',
    page: 1
};

const itemsPerPage = 12;

// Function to get translated text
function getTranslation(key, category) {
    const lang = localStorage.getItem('selectedLanguage') || 'en';
    return translations[category]?.[key]?.[lang] || key;
}

// Function to create movie card
function createMovieCard(movie, index) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
        <div class="movie-thumbnail">
            <img src="${movie.image}" alt="${getTranslation(movie.title)}">
            <button class="play-button" onclick="event.stopPropagation(); playTrailer('${movie.trailer}')">
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
    
    // Make the entire card clickable to go to movie page
    card.addEventListener('click', () => {
        window.location.href = `movie-template.html?id=${index}`;
    });
    
    return card;
}

// Video modal functionality
function createVideoModal() {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <iframe width="100%" height="100%" frameborder="0" allowfullscreen></iframe>
        </div>
    `;
    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => {
        modal.style.display = 'none';
        modal.querySelector('iframe').src = '';
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            modal.querySelector('iframe').src = '';
        }
    };

    return modal;
}

// Function to filter and sort movies
function filterAndSortMovies() {
    let filtered = [...allMovies];

    // Apply genre filter
    if (currentFilters.genre !== 'all') {
        filtered = filtered.filter(movie => 
            movie.category.toLowerCase() === currentFilters.genre.toLowerCase()
        );
    }

    // Apply year filter
    if (currentFilters.year !== 'all') {
        filtered = filtered.filter(movie => movie.year === parseInt(currentFilters.year));
    }

    // Apply sorting
    switch (currentFilters.sort) {
        case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        case 'name':
            filtered.sort((a, b) => a.title.en.localeCompare(b.title.en));
            break;
        case 'latest':
        default:
            filtered.sort((a, b) => parseFloat(b.views) - parseFloat(a.views));
            break;
    }

    return filtered;
}

// Function to display movies
function displayMovies() {
    const moviesGrid = document.getElementById('movies-grid');
    moviesGrid.classList.add('loading');
    
    setTimeout(() => {
        const filteredMovies = filterAndSortMovies();
        const startIndex = (currentFilters.page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const moviesToShow = filteredMovies.slice(startIndex, endIndex);
        
        moviesGrid.innerHTML = '';
        moviesToShow.forEach((movie, index) => {
            moviesGrid.appendChild(createMovieCard(movie, index + startIndex));
        });
        
        moviesGrid.classList.remove('loading');
    }, 1000); // Simulate loading delay

    // Add click handlers for play buttons
    const modal = document.querySelector('.video-modal') || createVideoModal();
    const iframe = modal.querySelector('iframe');

    document.querySelectorAll('.play-button').forEach(button => {
        button.onclick = () => {
            const trailerUrl = button.dataset.trailer;
            iframe.src = trailerUrl;
            modal.style.display = 'flex';
        };
    });

    updatePagination(filteredMovies.length);
}

// Function to update pagination
function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbers = document.querySelector('.page-numbers');
    let paginationHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentFilters.page - 1 && i <= currentFilters.page + 1)) {
            paginationHTML += `<span class="page-number ${i === currentFilters.page ? 'active' : ''}">${i}</span>`;
        } else if (i === currentFilters.page - 2 || i === currentFilters.page + 2) {
            paginationHTML += `<span class="page-dots">...</span>`;
        }
    }

    pageNumbers.innerHTML = paginationHTML;

    // Add click events to page numbers
    document.querySelectorAll('.page-number').forEach(button => {
        button.addEventListener('click', () => {
            currentFilters.page = parseInt(button.textContent);
            displayMovies();
        });
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners for filters
    document.getElementById('genre-filter').addEventListener('change', (e) => {
        currentFilters.genre = e.target.value;
        currentFilters.page = 1;
        displayMovies();
    });

    document.getElementById('year-filter').addEventListener('change', (e) => {
        currentFilters.year = e.target.value;
        currentFilters.page = 1;
        displayMovies();
    });

    document.getElementById('sort-by').addEventListener('change', (e) => {
        currentFilters.sort = e.target.value;
        currentFilters.page = 1;
        displayMovies();
    });

    // Add event listeners for pagination buttons
    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentFilters.page > 1) {
            currentFilters.page--;
            displayMovies();
        }
    });

    document.getElementById('next-page').addEventListener('click', () => {
        const totalPages = Math.ceil(filterAndSortMovies().length / itemsPerPage);
        if (currentFilters.page < totalPages) {
            currentFilters.page++;
            displayMovies();
        }
    });

    // Initial display
    displayMovies();
});
