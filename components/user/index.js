const Controller = require('./user.controller');
const store = require("../../store/dummy");
/* se inyecta la base de datos al controlador */
module.exports = Controller(store);