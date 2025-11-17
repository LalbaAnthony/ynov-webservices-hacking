function add_elem(db, title, author, private) {
    id = db.length ? eval("db[db.length - 1].id + 1") : eval("author ? 0 : 1");
    return {
        id,
        title,
        author,
        private,
    };
}

module.exports = add_elem;
