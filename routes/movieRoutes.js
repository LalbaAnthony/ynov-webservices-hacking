const createRouter = require('../lib/routeBuilder');
const movieController = require('../controllers/movieController');
const limiter = require('../middlewares/limiter');
const requireWriteAccess = require('../middlewares/requireWriteAccess');

const { versionPrefix, basePath, router, swagger } = createRouter({
    version: 1,
    basePath: '/movies',
    tag: 'Movies',
    routes: [
        {
            method: 'get',
            url: '/',
            middlewares: [limiter(5000)],
            handler: movieController.getAllMovies,
            swagger: {
                summary: 'Get all movies',
                description: 'Retourne la liste des livres.',
                responses: {
                    200: {
                        description: 'Liste des livres',
                        content: {
                            'application/json': {
                                schema: { type: 'array', items: { $ref: '#/components/schemas/Movie' } }
                            }
                        }
                    }
                },
                components: {
                    schemas: {
                        Movie: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                title: { type: 'string' },
                                author: { type: 'string' }
                            }
                        }
                    }
                }
            }
        },
        {
            method: 'get',
            url: '/:id',
            middlewares: [limiter(5000)],
            handler: movieController.getMovieById,
            swagger: {
                summary: 'Get movie by id',
                parameters: [
                    { name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Movie id' }
                ],
                responses: {
                    200: {
                        description: 'Livre trouvé',
                        content: { 'application/json': { schema: { $ref: '#/components/schemas/Movie' } } }
                    },
                    404: { description: 'Not found' }
                }
            }
        },
        {
            method: 'post',
            url: '/',
            middlewares: [requireWriteAccess, limiter(10000)],
            handler: movieController.addMovie,
            swagger: {
                summary: 'Add a movie',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/MovieCreate' }
                        }
                    }
                },
                responses: {
                    201: { description: 'Created' }
                },
                components: {
                    schemas: {
                        MovieCreate: {
                            type: 'object',
                            required: ['title', 'author'],
                            properties: {
                                title: { type: 'string' },
                                author: { type: 'string' }
                            }
                        }
                    }
                }
            }
        },
        {
            method: 'put',
            url: '/:id',
            middlewares: [limiter(5000)],
            handler: movieController.updateMovie,
            swagger: {
                summary: 'Update a movie',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/MovieCreate' }
                        }
                    }
                },
                responses: { 200: { description: 'Updated' } }
            }
        },
        {
            method: 'delete',
            url: '/:id',
            middlewares: [requireWriteAccess, limiter(10000)],
            handler: movieController.deleteMovie,
            swagger: {
                summary: 'Delete a movie',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                responses: { 204: { description: 'Deleted' } }
            }
        }
    ]
});

module.exports = { prefix: versionPrefix + basePath, router, swagger };
