function errorHandler(err, req, res, next) {
    res.status(500).json({
        error: err.message,
        stack: err.stack
    });
    next(err);
}

function boomErrorHandler(err, req, res, next) {
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json({
            status: output.statusCode,
            error: output.payload.message,
            stack: output.payload.stack

        });

    }
    next(err)
}
module.exports = {
    errorHandler,
    boomErrorHandler
}

