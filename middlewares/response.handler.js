function Success(req, res, message, status) {
    res.status(status || 200).json({
        error: false,
        status: status || 200,
        message: message
    });
}

module.exports = {
    Success
}

