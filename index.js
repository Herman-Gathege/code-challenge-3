
document.addEventListener('DOMContentLoaded', () => {
    fetchMovies();
});

function fetchMovies() {
    fetch('http://localhost:3000/films')
        .then(response => response.json())
        .then(movies => {
            displayMovieList(movies);
            displayMovieDetails(movies[0]); 
        })
        .catch(error => console.error('Error:', error));
}

function displayMovieList(movies) {
    const filmsList = document.getElementById('films');
    filmsList.innerHTML = ''; 

    movies.forEach(movie => {
        const li = document.createElement('li');
        li.textContent = movie.title;
        li.classList.add('film', 'item');
        li.addEventListener('click', () => displayMovieDetails(movie));
        filmsList.appendChild(li);
    });
}

function displayMovieDetails(movie) {
    document.getElementById('movie-poster').src = movie.poster;
    document.getElementById('movie-title').textContent = movie.title;
    document.getElementById('movie-runtime').textContent = `${movie.runtime} minutes`;
    document.getElementById('movie-showtime').textContent = movie.showtime;
    
    updateAvailableTickets(movie);

    const buyButton = document.getElementById('buy-ticket');
    buyButton.disabled = movie.tickets_sold >= movie.capacity;
    buyButton.onclick = () => buyTicket(movie);
}

function updateAvailableTickets(movie) {
    const availableTickets = movie.capacity - movie.tickets_sold;
    document.getElementById('available-tickets').textContent = `${availableTickets} out of ${movie.capacity}`;
}

function buyTicket(movie) {
    if (movie.tickets_sold < movie.capacity) {
        movie.tickets_sold++;
        updateAvailableTickets(movie);
        
        const buyButton = document.getElementById('buy-ticket');
        buyButton.disabled = movie.tickets_sold >= movie.capacity;

        if (buyButton.disabled) {
            buyButton.textContent = 'Sold Out';
        }
    }
}