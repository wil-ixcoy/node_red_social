const Tabla = 'users';
/* solo se llama auth y automaticamente usa el index.js */
const auth = require('../auth');
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

    return {
        create,
        findAll,
        findOne
    };
}
