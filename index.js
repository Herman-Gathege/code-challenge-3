document.addEventListener("DOMContentLoaded", () => {
    // Fetch and display the first movie's details
    fetchMovieDetails(1);

    // Fetch and display the list of all movies
    fetchMovies();

    // Handle ticket purchase
    document.getElementById("buy-ticket").addEventListener("click", buyTicket);
});

function fetchMovieDetails(id) {
    fetch(`http://localhost:3000/films/${id}`)
        .then(response => response.json())
        .then(movie => displayMovieDetails(movie));
}

function fetchMovies() {
    fetch("http://localhost:3000/films")
        .then(response => response.json())
        .then(movies => displayMovieList(movies));
}

function displayMovieDetails(movie) {
    document.getElementById("poster").src = movie.poster;
    document.getElementById("title").textContent = movie.title;
    document.getElementById("runtime").textContent = `Runtime: ${movie.runtime} minutes`;
    document.getElementById("showtime").textContent = `Showtime: ${movie.showtime}`;
    document.getElementById("available-tickets").textContent = `Available Tickets: ${movie.capacity - movie.tickets_sold}`;
    document.getElementById("buy-ticket").dataset.movieId = movie.id;
}

function displayMovieList(movies) {
    const filmsList = document.getElementById("films");
    filmsList.innerHTML = ""; // Clear any existing content

    movies.forEach(movie => {
        const li = document.createElement("li");
        li.textContent = movie.title;
        li.className = "film item";
        li.dataset.movieId = movie.id;
        li.addEventListener("click", () => fetchMovieDetails(movie.id));
        filmsList.appendChild(li);
    });
}

function buyTicket() {
    const movieId = this.dataset.movieId;
    const availableTicketsElem = document.getElementById("available-tickets");
    let availableTickets = parseInt(availableTicketsElem.textContent.split(": ")[1]);

    if (availableTickets > 0) {
        availableTickets--;
        availableTicketsElem.textContent = `Available Tickets: ${availableTickets}`;
    }

    if (availableTickets === 0) {
        this.disabled = true;
    }
}
