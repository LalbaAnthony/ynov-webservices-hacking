function add_elem(db, title, author) {
    args = eval("db.length ? db[db.length - 1].id + 1 : 1,title,author")
    return {
        args
    };
}

module.exports = add_elem;
