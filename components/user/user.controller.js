const Tabla = 'users';
/* solo se llama auth y automaticamente usa el index.js */
const auth = require('../auth');
const boom = require('@hapi/boom');
module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/dummy');
    }

    async function create(data) {
        const user = {
            name: data.name,
            username: data.username,
            email: data.email,
            role: "user",
        };
        if (data.id) {
            user.id = data.id;
        } else {
            user.id = Math.floor((Math.random() * 10000));
        }
        await store.upsert(Tabla, user);
        if (data.password && data.email) {
            await auth.create({
                id: user.id,
                email: user.email,
                password: data.password

            })
        }
        return user;
    }

    async function findAll() {
        return store.list(Tabla);
    }
    async function findOne(id) {
        return store.getOne(Tabla, id);
    }
    async function update(id, data) {
        const user = await store.getOne(Tabla, id);
        if (!user) {
            throw boom.notFound('No existe el usuario');
        }
        const updatedUser = await store.upsert(Tabla, {
            id: user.id,
            name: data.name || user.name,
            username: data.username || user.username,
            email: data.email || user.email,
        });
        return updatedUser;
    }



    return {
        create,
        findAll,
        findOne,
        update
    };
}
