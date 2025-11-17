let moviesDB = require('../data/moviesDB');
const add_elem = require('./add_elem');

const DEFAULT_REQUEST_LIMIT = 10;
const MAX_REQUEST_LIMIT = 50;

function getAll(params = { page: 1, limit: DEFAULT_REQUEST_LIMIT }) {
    const { page, limit, displayPrivates = false } = params;

    // Validators
    if (!page || isNaN(page) || page < 1) page = 1;
    if (!limit || isNaN(limit) || limit < 1) limit = DEFAULT_REQUEST_LIMIT;
    if (limit > MAX_REQUEST_LIMIT) limit = MAX_REQUEST_LIMIT;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let movies = moviesDB
    if (!displayPrivates) movies = movies.filter(movie => !movie.private); // Filter private movies
    movies = movies.slice(startIndex, endIndex); // Paginate
    
    return movies;
}

function getById(id) {
    return moviesDB.find(movie => movie.id === id) || null;
}

function add(title, author) {
    const newMovie = add_elem(moviesDB, title, author)

    moviesDB.push(newMovie);
    return newMovie;
}

function update(id, title, author, private = false) {
    const index = moviesDB.findIndex(movie => movie.id === id);
    if (index === -1) return null;

    const updated = { id, title, author, private };
    moviesDB[index] = updated;
    return updated;
}

function destroy(id) {
    const index = moviesDB.findIndex(movie => movie.id === id);
    if (index === -1) return null;

    const deleted = moviesDB.splice(index, 1);
    return deleted[0];
}

module.exports = {
    getAll,
    getById,
    add,
    update,
    destroy,
};
