const Controller = require('./auth.controller');
const store = require("../../store/mysql");
/* se inyecta la base de datos al controlador */
module.exports = Controller(store);