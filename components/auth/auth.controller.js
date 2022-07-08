const Tabla = 'auth';
const { config } = require('../../config');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const boom = require('@hapi/boom');
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
            authData.password = await bcrypt.hash(data.password, 10);
        }
        if (data.role) {
            authData.role = data.role;
        }
        return store.upsert(Tabla, authData);
    }
    async function login(email, password) {
        const user = await store.query(Tabla, { email: email })
        if (!user[0]) {
            throw boom.unauthorized('No existe el usuario')
        }
        let isPassword = await bcrypt.compare(password, user[0].password);
        if (!isPassword) {
            throw boom.unauthorized('Contraseña incorrecta')
        }
        const token = await tokenJWT(user[0]);
        return token;
    }

    async function tokenJWT(user) {
        console.log(user)
        const payload = {
            sub: user.id,
            role: user.role,
        };
        const token = jwt.sign(payload, config.secret_jwt);
        return { user, token };
    }
    return {
        create,
        login
    };
}
