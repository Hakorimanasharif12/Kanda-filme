document.addEventListener('DOMContentLoaded', () => {
    const addMovieForm = document.getElementById('add-movie-form');
    const moviesListBody = document.getElementById('movies-list-body');

    // Function to load existing movies
    function loadMovies() {
        fetch('api/movies/read.php')
            .then(response => response.json())
            .then(movies => {
                moviesListBody.innerHTML = ''; // Clear existing rows
                movies.forEach(movie => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${movie.title}</td>
                        <td>${movie.category}</td>
                        <td>
                            <button onclick="editMovie(${movie.id})">Edit</button>
                            <button onclick="deleteMovie(${movie.id})">Delete</button>
                        </td>
                    `;
                    moviesListBody.appendChild(row);
                });
            })
            .catch(error => console.error('Error loading movies:', error));
    }

    // Function to add a new movie
    addMovieForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(addMovieForm);

        // Validate file sizes and types
        const posterFile = formData.get('poster');
        const videoFile = formData.get('video');

        // Check poster file
        if (posterFile.size > 5 * 1024 * 1024) { // 5MB limit
            alert('Poster image must be less than 5MB');
            return;
        }

        // Check video file
        if (videoFile.size > 500 * 1024 * 1024) { // 500MB limit
            alert('Video file must be less than 500MB');
            return;
        }

        if (!['image/jpeg', 'image/png', 'image/gif'].includes(posterFile.type)) {
            alert('Poster must be a JPEG, PNG, or GIF image');
            return;
        }

        if (videoFile.type !== 'video/mp4') {
            alert('Video must be an MP4 file');
            return;
        }

        fetch('api/movies/create.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Movie added successfully!');
                loadMovies(); // Refresh movie list
                addMovieForm.reset(); // Clear form
            } else {
                alert('Failed to add movie: ' + result.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while adding the movie.');
        });
    });

    // Initial load of movies
    loadMovies();
});

// Placeholder functions for edit and delete (you'll implement these later)
function editMovie(id) {
    alert(`Edit movie ${id}`);
}

function deleteMovie(id) {
    if (confirm('Are you sure you want to delete this movie?')) {
        fetch(`api/movies/delete.php?id=${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Movie deleted successfully!');
                loadMovies(); // Refresh movie list
            } else {
                alert('Failed to delete movie: ' + result.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while deleting the movie.');
        });
    }
}
