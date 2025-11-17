const { jwtverify } = require('../utils/jwt');

function requireWriteAccess(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: "Auth failed: Missing token" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Auth failed: Invalid token" });
    }

    try {
        const decoded = jwtverify(token);
        req.user = decoded;


        if (!decoded.role || decoded.role !== "writer") {
            return res.status(401).json({ message: "Auth failed: Write access required" });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: "Auth failed: Invalid token" });
    }
}

module.exports = requireWriteAccess;
