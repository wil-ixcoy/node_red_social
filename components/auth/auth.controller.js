const Tabla = 'auth';
const { config } = require('../../config');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const boom = require('@hapi/boom');
const Store = require("../../store/mysql");


class AuthController{
    async  create(data) {
        try {
            let authData = {};
            authData.id = data.id;
            authData.email = data.email;
            authData.password = await bcrypt.hash(data.password, 10);
            authData.role = data.role;
            authData.created_at = data.created_at;

            return await Store.insert(Tabla, authData);
        } catch (err) {
            return err;
        }
    }
    async  login(email, password) {
        const user = await Store.query(Tabla, { email: email })
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

    async  tokenJWT(user) {
        console.log(user)
        const payload = {
            sub: user.id,
            role: user.role,
        };
        const token = jwt.sign(payload, config.secret_jwt);
        return { user, token };
    }

    async  update(id, newEmail) {
        await Store.update(Tabla, id, { email: newEmail });
    }
}

module.exports = AuthController;