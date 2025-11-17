let booksDB = require('../data/booksDB');

const DEFAULT_REQUEST_LIMIT = 10;
const MAX_REQUEST_LIMIT = 50;

function getAll(params = { page: 1, limit: DEFAULT_REQUEST_LIMIT }) {
    const { page, limit } = params;

    // Validators
    if (!page || isNaN(page) || page < 1) page = 1;
    if (!limit || isNaN(limit) || limit < 1) limit = DEFAULT_REQUEST_LIMIT;
    if (limit > MAX_REQUEST_LIMIT) limit = MAX_REQUEST_LIMIT;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    return booksDB.slice(startIndex, endIndex);
}

function getById(id) {
    return booksDB.find(book => book.id === id) || null;
}

function add(title, author) {
    const newBook = {
        id: booksDB.length ? booksDB[booksDB.length - 1].id + 1 : 1,
        title,
        author,
    };

    booksDB.push(newBook);
    return newBook;
}

function update(id, title, author) {
    const index = booksDB.findIndex(book => book.id === id);
    if (index === -1) return null;

    const updated = { id, title, author };
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
