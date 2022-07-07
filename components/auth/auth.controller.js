const Tabla = 'auth';
const { config } = require('../../config');
const jwt = require("jsonwebtoken")
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
            const token = await tokenJWT(user[0]);
            return token;
        }
        else {
            return null;
        }
    }

    async function tokenJWT(user) {
        const payload = {
            sub: user.id,
        };
        const token = jwt.sign(payload, config.secret_jwt);
        return {
            user, token
        };
    }
    return {
        create,
        login
    };
}
