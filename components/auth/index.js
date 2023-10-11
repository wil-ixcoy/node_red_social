import Controller from './auth.controller';
import store from "../../store/mysql";
/* se inyecta la base de datos al controlador */
export default Controller(store);