const store = require("../../store/dummy");
const Tabla = 'users';
async function listUsers() {
    return store.findAll(Tabla);
}

module.exports = {
    listUsers
}