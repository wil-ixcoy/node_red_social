import Controller from './user.controller';
//const store = require("../../store/mysql");
import store from "../../store/mysql.remote";
export default Controller(store);