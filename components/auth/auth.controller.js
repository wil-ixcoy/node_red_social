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
    async function login(email, password) {
        const user = await store.query(Tabla, { email: email })
        if (user && user[0] && user[0].password === password) {
            return user[0];
        }
        else {
            return null;
        }
    }
    return {
        create,
        login
    };
}
