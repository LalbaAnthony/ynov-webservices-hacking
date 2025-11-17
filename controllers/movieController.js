const { attachLinks } = require('../hateoasHelper');
const MovieProxy = require('../proxies/movieProxy');

function getAllMovies(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const params = { page, limit };

    const movies = MovieProxy.getAll(params);
    const enricheds = attachLinks('movies', movies, req.baseUrl, 1);
    
    res.json(enricheds);
}

function getMovieById(req, res) {
    const id = parseInt(req.params.id);
    const movie = MovieProxy.getById(id);

    if (!movie) {
        return res.status(404).json({ message: "Livre non trouvé" });
    }

    const enriched = attachLinks('movies', movie, req.baseUrl, 1);

    res.json(enriched);
}

function addMovie(req, res) {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({ message: "Titre et auteur sont requis." });
    }

    if (!/^[a-zA-Z0-9\s]+$/.test(title) || !/^[a-zA-Z0-9\s]+$/.test(author)) {
        return res.status(400).json({ message: "Titre et auteur ne doivent contenir que des caractères alphanumériques et des espaces." });
    }

    if (title.length > 100 || author.length > 100) {
        return res.status(400).json({ message: "Titre et auteur ne doivent pas dépasser 100 caractères." });
    }

    title = title.trim()
    author = author.trim()

    const newMovie = MovieProxy.add(title, author);
    
    const enriched = attachLinks('movies', newMovie, req.baseUrl, 1);

    res.status(201).json(enriched);
}

function updateMovie(req, res) {
    const id = parseInt(req.params.id);
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({ message: "Titre et auteur sont requis." });
    }

    if (!/^[a-zA-Z0-9\s]+$/.test(title) || !/^[a-zA-Z0-9\s]+$/.test(author)) {
        return res.status(400).json({ message: "Titre et auteur ne doivent contenir que des caractères alphanumériques et des espaces." });
    }

    if (title.length > 100 || author.length > 100) {
        return res.status(400).json({ message: "Titre et auteur ne doivent pas dépasser 100 caractères." });
    }

    title = title.trim()
    author = author.trim()

    const updated = MovieProxy.update(id, title, author);

    if (!updated) {
        return res.status(404).json({ message: "Livre non trouvé" });
    }

    const enriched = attachLinks('movies', updated, req.baseUrl, 1);

    res.json(enriched);
}

function deleteMovie(req, res) {
    const id = parseInt(req.params.id);
    const deleted = MovieProxy.destroy(id);

    if (!deleted) {
        return res.status(404).json({ message: "Livre non trouvé" });
    }

    res.json({ message: "Livre supprimé", deleted });
}

module.exports = {
    getAllMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie,
};
