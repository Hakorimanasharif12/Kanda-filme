// Language translations
const translations = {
    en: {
        home: "Home",
        movies: "Movies",
        series: "Series",
        categories: "Categories",
        about: "About",
        searchPlaceholder: "Search movies...",
        watchNow: "Watch Now",
        trending: "Trending Now",
        latestReleases: "Latest Releases",
        loadMore: "Load More",
        stayUpdated: "Stay Updated",
        newsletterDesc: "Subscribe to our newsletter for the latest movies and updates",
        subscribe: "Subscribe",
        login: "Login",
        quickLinks: "Quick Links",
        support: "Support",
        contactUs: "Contact Us",
        movieDescriptions: {
            "Black Panther": "Experience the next chapter of the Wakandan legacy",
            "Avengers": "The epic conclusion to the Infinity Saga",
            "Spider-Man": "The multiverse unleashed"
        },
        footerDesc: "Your ultimate destination for online movies",
        faq: "FAQ",
        help: "Help Center",
        terms: "Terms of Use",
        privacy: "Privacy Policy",
        emailPlaceholder: "Enter your email",
        contactInfo: {
            email: "Email: info@kandafilme.com",
            phone: "Phone: +250 123 456 789",
            address: "Address: Kigali, Rwanda"
        }
    },
    rw: {
        home: "Ahabanza",
        movies: "Filime",
        series: "Ikimurika",
        categories: "Ibyiciro",
        about: "Abo turibo",
        searchPlaceholder: "Shakisha filime...",
        watchNow: "Reba Nonaha",
        trending: "Zikunzwe Cyane",
        latestReleases: "Filime Nshya",
        loadMore: "Reba Izindi",
        stayUpdated: "Kora Subscribe",
        newsletterDesc: "Andika email yawe kugirango ubone amakuru ya filime nshya",
        subscribe: "Kora Subscribe",
        login: "Injira",
        quickLinks: "Links Zihuse",
        support: "Ubufasha",
        contactUs: "Twandikire",
        movieDescriptions: {
            "Black Panther": "Reba igice gikurikira cy'inkuru ya Wakanda",
            "Avengers": "Umwanzuro ukomeye wa Infinity Saga",
            "Spider-Man": "Isi nyinshi zifunguwe"
        },
        footerDesc: "Ahantu hawe nyaho kuri filime",
        faq: "Ibibazo Bikunze Kubazwa",
        help: "Ubufasha",
        terms: "Amategeko",
        privacy: "Politiki y'Ibanga",
        emailPlaceholder: "Andika email yawe",
        contactInfo: {
            email: "Email: info@kandafilme.com",
            phone: "Telefone: +250 123 456 789",
            address: "Aderesi: Kigali, Rwanda"
        }
    },
    fr: {
        home: "Accueil",
        movies: "Films",
        series: "Séries",
        categories: "Catégories",
        about: "À propos",
        searchPlaceholder: "Rechercher des films...",
        watchNow: "Regarder",
        trending: "Tendances",
        latestReleases: "Dernières Sorties",
        loadMore: "Voir Plus",
        stayUpdated: "Restez Informé",
        newsletterDesc: "Abonnez-vous à notre newsletter pour les derniers films et mises à jour",
        subscribe: "S'abonner",
        login: "Connexion",
        quickLinks: "Liens Rapides",
        support: "Support",
        contactUs: "Contactez-nous",
        movieDescriptions: {
            "Black Panther": "Découvrez le prochain chapitre de l'héritage Wakanda",
            "Avengers": "La conclusion épique de la Saga de l'Infini",
            "Spider-Man": "Le multivers déchaîné"
        },
        footerDesc: "Votre destination ultime pour les films en ligne",
        faq: "FAQ",
        help: "Centre d'Aide",
        terms: "Conditions d'Utilisation",
        privacy: "Politique de Confidentialité",
        emailPlaceholder: "Entrez votre email",
        contactInfo: {
            email: "Email: info@kandafilme.com",
            phone: "Téléphone: +250 123 456 789",
            address: "Adresse: Kigali, Rwanda"
        }
    }
};

// Sample movie data
const movies = [
    {
        title: "Black Panther: Wakanda Forever",
        image: "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
        rating: 8.5,
        duration: "2h 41m",
        year: 2023,
        description: "Experience the next chapter of the Wakandan legacy"
    },
    {
        title: "Avengers: Endgame",
        image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        rating: 9.2,
        duration: "3h 2m",
        year: 2023,
        description: "The epic conclusion to the Infinity Saga"
    },
    {
        title: "Spider-Man: No Way Home",
        image: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
        rating: 8.9,
        duration: "2h 28m",
        year: 2023,
        description: "The multiverse unleashed"
    }
];

// Initialize Swiper
document.addEventListener('DOMContentLoaded', () => {
    // Hero Swiper
    const heroSwiper = new Swiper('.hero .swiper-container', {
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Trending Swiper
    const trendingSwiper = new Swiper('.trending-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
            },
        },
    });

    // Initialize movies
    loadMovies();
});

// Change language function
function changeLanguage(lang) {
    // Store the selected language in localStorage
    localStorage.setItem('selectedLanguage', lang);
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update all elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    // Update movie descriptions
    updateMovieDescriptions(lang);
    
    // Update placeholders
    updatePlaceholders(lang);
    
    // Update contact information
    updateContactInfo(lang);
    
    // Update dynamic content
    updateDynamicContent(lang);
}

// Function to update movie descriptions based on language
function updateMovieDescriptions(lang) {
    const movieElements = document.querySelectorAll('.movie-card');
    movieElements.forEach(movieElement => {
        const titleElement = movieElement.querySelector('h3');
        const descElement = movieElement.querySelector('p');
        
        if (titleElement && descElement) {
            const title = titleElement.textContent;
            const movieKey = Object.keys(translations[lang].movieDescriptions).find(key => title.includes(key));
            
            if (movieKey) {
                descElement.textContent = translations[lang].movieDescriptions[movieKey];
            }
        }
    });
}

// Function to update placeholders
function updatePlaceholders(lang) {
    // Update search placeholder
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.placeholder = translations[lang].searchPlaceholder;
    }
    
    // Update email placeholder
    const emailInput = document.querySelector('.newsletter-form input[type="email"]');
    if (emailInput) {
        emailInput.placeholder = translations[lang].emailPlaceholder;
    }
}

// Function to update contact information
function updateContactInfo(lang) {
    const contactSection = document.querySelector('.footer-section:last-child');
    if (contactSection) {
        const contactElements = contactSection.querySelectorAll('p');
        const contactInfo = translations[lang].contactInfo;
        
        contactElements.forEach(element => {
            if (element.innerHTML.includes('envelope')) {
                element.innerHTML = `<i class="fas fa-envelope"></i> ${contactInfo.email}`;
            } else if (element.innerHTML.includes('phone')) {
                element.innerHTML = `<i class="fas fa-phone"></i> ${contactInfo.phone}`;
            } else if (element.innerHTML.includes('map-marker-alt')) {
                element.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${contactInfo.address}`;
            }
        });
    }
}

// Function to update dynamic content
function updateDynamicContent(lang) {
    // Update footer description
    const footerDesc = document.querySelector('.footer-section p');
    if (footerDesc) {
        footerDesc.textContent = translations[lang].footerDesc;
    }
    
    // Update movie counts in categories
    const movieCounts = document.querySelectorAll('.movie-count');
    movieCounts.forEach(count => {
        const number = count.textContent.match(/\d+/)[0];
        count.textContent = `${number} ${translations[lang].movies}`;
    });
}

// Initialize language from localStorage or default to English
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    
    // Set the select element to the saved language
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.value = savedLanguage;
    }
    
    // Apply the saved language
    changeLanguage(savedLanguage);
    
    // Initialize other components
    initializeSwiper();
    loadMovies();
});

// Load movies function
function loadMovies() {
    const movieGrid = document.querySelector('.movie-grid');
    const moviesHTML = movies.map(movie => createMovieCard(movie)).join('');
    movieGrid.innerHTML = moviesHTML;
}

// Create movie card
function createMovieCard(movie) {
    return `
        <div class="movie-card">
            <div class="movie-poster">
                <img src="${movie.image}" alt="${movie.title}">
                <div class="movie-overlay">
                    <div class="movie-info">
                        <span class="rating"><i class="fas fa-star"></i> ${movie.rating}</span>
                        <span class="duration"><i class="fas fa-clock"></i> ${movie.duration}</span>
                        <span class="year">${movie.year}</span>
                    </div>
                    <button class="watch-now" data-translate="watchNow">Watch Now</button>
                </div>
            </div>
            <h3>${movie.title}</h3>
            <p>${movie.description}</p>
        </div>
    `;
}

// Search functionality
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', debounce((e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredMovies = movies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm) ||
        movie.description.toLowerCase().includes(searchTerm)
    );
    updateMovieGrid(filteredMovies);
}, 300));

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        // Here you would typically send this to a server
        alert('Thank you for subscribing!');
        e.target.reset();
    });
}

// Load more button
const loadMoreBtn = document.querySelector('.load-more');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        // Here you would typically load more movies from a server
        loadMoreBtn.classList.add('loading');
        setTimeout(() => {
            loadMoreBtn.classList.remove('loading');
            // Add more movies to the grid
        }, 1000);
    });
}

// Slideshow functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
let slideInterval;

function showSlide(n) {
    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Calculate the correct slide index
    currentSlide = (n + slides.length) % slides.length;
    
    // Add active class to current slide
    slides[currentSlide].classList.add('active');
    
    // Update slide content
    updateSlideContent(currentSlide);
}

function updateSlideContent(index) {
    const movie = movies[index];
    const slide = slides[index];
    
    if (slide && movie) {
        // Update image
        const img = slide.querySelector('img');
        if (img) {
            img.src = movie.image;
            img.alt = movie.title;
        }
        
        // Update text content
        const title = slide.querySelector('h2');
        const desc = slide.querySelector('p');
        if (title) title.textContent = movie.title;
        if (desc) desc.textContent = movie.description;
        
        // Update movie info if it exists
        const rating = slide.querySelector('.rating');
        const duration = slide.querySelector('.duration');
        const year = slide.querySelector('.year');
        
        if (rating) rating.innerHTML = `<i class="fas fa-star"></i> ${movie.rating}`;
        if (duration) duration.innerHTML = `<i class="fas fa-clock"></i> ${movie.duration}`;
        if (year) year.textContent = movie.year;
    }
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startSlideshow() {
    // Clear any existing interval
    if (slideInterval) {
        clearInterval(slideInterval);
    }
    
    // Start new interval
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlideshow() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Set initial language
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    changeLanguage(savedLanguage);
    
    // Initialize slideshow
    if (slides.length > 0) {
        // Add event listeners for navigation
        const nextButton = document.querySelector('.next');
        const prevButton = document.querySelector('.prev');
        
        if (nextButton) {
            nextButton.addEventListener('click', (e) => {
                e.preventDefault();
                nextSlide();
                // Restart slideshow timer
                startSlideshow();
            });
        }
        
        if (prevButton) {
            prevButton.addEventListener('click', (e) => {
                e.preventDefault();
                prevSlide();
                // Restart slideshow timer
                startSlideshow();
            });
        }
        
        // Add hover events to stop/start slideshow
        const slideshow = document.querySelector('.slideshow');
        if (slideshow) {
            slideshow.addEventListener('mouseenter', stopSlideshow);
            slideshow.addEventListener('mouseleave', startSlideshow);
        }
        
        // Show first slide and start slideshow
        showSlide(0);
        startSlideshow();
    }
    
    // Load initial movies
    updateMovieGrid(movies);
});
