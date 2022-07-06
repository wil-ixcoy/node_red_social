const Tabla = 'users';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/dummy');
    }

    async function findAll() {
        return store.list(Tabla);
    }
    async function findOne(id) {
        return store.getOne(Tabla, id);
    }
    return {
        findAll,
        findOne
    };
}
