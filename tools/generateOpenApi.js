const fs = require('fs');
const yaml = require('js-yaml');

const bookRoutes = require('../routes/bookRoutes');

const modules = [bookRoutes];

function mergeSwaggers(modules) {
    const merged = {
        openapi: '3.0.0',
        info: { title: 'My API', version: '1.0.0' },
        servers: [{ url: 'http://localhost:3000' }],
        paths: {},
        components: { schemas: {} },
    };

    modules.forEach((m) => {
        const s = m.swagger || {};
        Object.entries(s.paths || {}).forEach(([p, obj]) => {
            merged.paths[p] = merged.paths[p] || {};
            Object.entries(obj).forEach(([method, op]) => {
                merged.paths[p][method] = op;
            });
        });
        if (s.components?.schemas) {
            merged.components.schemas = Object.assign({}, merged.components.schemas, s.components.schemas);
        }
    });

    return merged;
}

const apiSpec = mergeSwaggers(modules);

const yamlSpec = yaml.dump(apiSpec, { noRefs: true });

fs.writeFileSync('openapi.yml', yamlSpec);

console.log('Generated openapi.yml successfully!');
