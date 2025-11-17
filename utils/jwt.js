const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'dev-secret-key';

function jwtsign(payload, expiresIn = '1h') {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function jwtverify(token) {
    return jwt.verify(token, SECRET_KEY);
}

module.exports = {
    jwtsign,
    jwtverify
};