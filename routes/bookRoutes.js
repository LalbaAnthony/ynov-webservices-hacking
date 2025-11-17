const createRouter = require('../lib/routeBuilder');
const bookController = require('../controllers/bookController');
const limiter = require('../middlewares/limiter');
const requireWriteAccess = require('../middlewares/requireWriteAccess');

const { versionPrefix, basePath, router, swagger } = createRouter({
    version: 1,
    basePath: '/books',
    tag: 'Books',
    routes: [
        {
            method: 'get',
            url: '/',
            middlewares: [limiter(5000)],
            handler: bookController.getAllBooks,
            swagger: {
                summary: 'Get all books',
                description: 'Retourne la liste des livres.',
                responses: {
                    200: {
                        description: 'Liste des livres',
                        content: {
                            'application/json': {
                                schema: { type: 'array', items: { $ref: '#/components/schemas/Book' } }
                            }
                        }
                    }
                },
                components: {
                    schemas: {
                        Book: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                title: { type: 'string' },
                                author: { type: 'string' },
                                private: { type: 'boolean' }
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
            handler: bookController.getBookById,
            swagger: {
                summary: 'Get book by id',
                parameters: [
                    { name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Book id' }
                ],
                responses: {
                    200: {
                        description: 'Livre trouvé',
                        content: { 'application/json': { schema: { $ref: '#/components/schemas/Book' } } }
                    },
                    404: { description: 'Not found' }
                }
            }
        },
        {
            method: 'post',
            url: '/',
            middlewares: [requireWriteAccess, limiter(10000)],
            handler: bookController.addBook,
            swagger: {
                summary: 'Add a book',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/BookCreate' }
                        }
                    }
                },
                responses: {
                    201: { description: 'Created' }
                },
                components: {
                    schemas: {
                        BookCreate: {
                            type: 'object',
                            required: ['title', 'author'],
                            properties: {
                                title: { type: 'string' },
                                author: { type: 'string' },
                                private: { type: 'boolean'}
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
            handler: bookController.updateBook,
            swagger: {
                summary: 'Update a book',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/BookCreate' }
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
            handler: bookController.deleteBook,
            swagger: {
                summary: 'Delete a book',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                responses: { 204: { description: 'Deleted' } }
            }
        }
    ]
});

module.exports = { prefix: versionPrefix + basePath, router, swagger };
