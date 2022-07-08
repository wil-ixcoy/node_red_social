const boom = require('@hapi/boom');
function checkRoles(...roles) {
    return function (req, res, next) {
        const user = req.user;
        if (roles.includes(user.role)) {
            next();
        } else {
            throw boom.unauthorized('No tienes permisos para esta acción');
        }
    };
}
module.exports = { checkRoles };