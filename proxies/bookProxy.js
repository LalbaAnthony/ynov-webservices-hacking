let booksDB = require('../data/booksDB');
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

    let books = booksDB
    if (!displayPrivates) books = books.filter(book => !book.private); // Filter private books
    books = books.slice(startIndex, endIndex); // Paginate
    
    return books;
}

function getById(id) {
    return booksDB.find(book => book.id === id) || null;
}

function add(title, author) {
    const newBook = add_elem(booksDB, title, author)

    booksDB.push(newBook);
    return newBook;
}

function update(id, title, author, private = false) {
    const index = booksDB.findIndex(book => book.id === id);
    if (index === -1) return null;

    const updated = { id, title, author, private };
    booksDB[index] = updated;
    return updated;
}

function destroy(id) {
    const index = booksDB.findIndex(book => book.id === id);
    if (index === -1) return null;

    const deleted = booksDB.splice(index, 1);
    return deleted[0];
}

module.exports = {
    getAll,
    getById,
    add,
    update,
    destroy,
};
