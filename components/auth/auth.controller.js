const Tabla = 'auth';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/dummy');
    }

    async function create(data) {
        const authData = {
            id: data.id,
        }
        if (data.email) {
            authData.email = data.email;
        }
        if (data.password) {
            authData.password = data.password;
        }
        return store.upsert(Tabla, authData);
    }
    return {
        create
    };
}
