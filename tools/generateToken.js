const { jwtsign } = require('../utils/jwt');

const token = jwtsign({ id: 1, role: "writer" });
console.log("JWT pour test:", token);
