const logger = (req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        const ms = Date.now() - start;
        console.log(`[LOG] ${req.method} ${req.originalUrl} → ${res.statusCode} (${ms}ms)`);
    });

    next();
};

module.exports = logger;
