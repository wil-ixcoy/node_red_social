const Controller = require('./user.controller');
//const store = require("../../store/mysql");
const store = require("../../store/mysql.remote")
module.exports = Controller(store);