function Handler404NotFound(req, res, next) {
    res.status(404).json({
        status: "error",
        message: "Resource not found",
    });
}

module.exports = Handler404NotFound;