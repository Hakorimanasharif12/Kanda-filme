document.addEventListener('DOMContentLoaded', () => {
    // Create loader HTML
    const loaderHTML = `
        <div class="loader-overlay" id="global-loader">
            <div class="loader">
                <div class="loader-inner"></div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', loaderHTML);

    // Loader styles
    const style = document.createElement('style');
    style.textContent = `
        .loader-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        .loader-overlay.show {
            opacity: 1;
            pointer-events: all;
        }
        .loader {
            width: 100px;
            height: 100px;
            position: relative;
        }
        .loader-inner {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 10px solid #f3f3f3;
            border-top: 10px solid red;
            border-bottom: 10px solid red;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        .loader-inner::before, 
        .loader-inner::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 10px solid transparent;
            border-top: 10px solid red;
            border-bottom: 10px solid red;
            border-radius: 50%;
        }
        .loader-inner::before {
            transform: rotate(60deg);
        }
        .loader-inner::after {
            transform: rotate(-60deg);
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Loader function
    function showLoader() {
        const loader = document.getElementById('global-loader');
        loader.classList.add('show');
        
        // Hide loader after 5 seconds
        setTimeout(() => {
            loader.classList.remove('show');
        }, 5000);
    }

    // Show loader on initial page load
    showLoader();

    // Show loader on page refresh
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            showLoader();
        }
    });

    // Add loader to navigation and specific interactions
    const interactionSelectors = [
        'a[href]:not([href="#"])', // All links except internal page anchors
        'button', 
        '.category-btn', 
        '.watch-btn', 
        '.movie-card', 
        '.similar-movie-card', 
        '.search-result-item'
    ];

    document.addEventListener('click', (event) => {
        const target = event.target.closest(interactionSelectors.join(', '));
        if (target) {
            // Check if it's a navigation link
            if (target.tagName === 'A' && target.getAttribute('href')) {
                // Prevent multiple loaders if clicking the same link
                if (!target.getAttribute('data-loader-triggered')) {
                    showLoader();
                    target.setAttribute('data-loader-triggered', 'true');
                    
                    // Reset the flag after navigation
                    setTimeout(() => {
                        target.removeAttribute('data-loader-triggered');
                    }, 6000);
                }
            } else {
                // For other interactions
                showLoader();
            }
        }
    });

    // Prevent multiple loaders on form submissions
    document.addEventListener('submit', (event) => {
        showLoader();
    });
});
