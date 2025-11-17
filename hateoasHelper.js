function buildLinks(baseUrl, version, resource, id = null) {
    const root = `/v${version}/${resource}`;
    const href = id ? `${root}/${id}` : root;

    return [
        { rel: 'self', method: 'GET', href },
        { rel: 'create', method: 'POST', href: root },
        { rel: 'update', method: 'PUT', href: id ? href : `${root}/{id}` },
        { rel: 'delete', method: 'DELETE', href: id ? href : `${root}/{id}` },
        { rel: 'collection', method: 'GET', href: root }
    ];
}

function attachLinks(resource, data, baseUrl, version) {
    if (Array.isArray(data)) {
        return data.map(item => ({
            ...item,
            links: buildLinks(baseUrl, version, resource, item.id)
        }));
    }
    return {
        ...data,
        links: buildLinks(baseUrl, version, resource, data.id)
    };
}

module.exports = { attachLinks };
