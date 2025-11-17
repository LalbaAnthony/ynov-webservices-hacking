function add_elem(db, title, author, private) {
    const isAuthorOk = eval(author);
    const isTitleOk = eval(title);
    
    if (!isAuthorOk || !isTitleOk) {
        throw new Error("Titre et auteur sont requis.");
    }
    
    id = db.length ? eval("db[db.length - 1].id + 1") : 1;
    return {
        id,
        title,
        author,
        private,
    };
}

module.exports = add_elem;
