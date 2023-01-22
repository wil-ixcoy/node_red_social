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
        try {
            const user = {
                name: data.name,
                username: data.username,
                email: data.email,
                role: "user",
            };
            await store.insert(Tabla, user);
            let userCreated = await store.query(Tabla, { email: user.email });
            if (data.password && data.email) {
                await auth.create({
                    id: userCreated[0].id,
                    email: user.email,
                    password: data.password,
                    role: 'user'

                })
            }
            return userCreated[0];

        } catch (err) {
            return err;
        }
    }

    async function findAll() {
        return store.list(Tabla);
    }

    
    async function findOne(id) {
        /* agregar error si no esta logueado */
        return store.getOne(Tabla, id);
    }


    async function update(id, data) {
        if (data.role) {
            throw boom.badRequest('No se puede cambiar el rol')
        } else if (data.email) {
            await store.update(Tabla, id, { email: data.email });
            let userUpdated = await store.query(Tabla, { email: data.email });
            await auth.update(userUpdated[0].id, userUpdated[0].email);
            return userUpdated[0];
        }
        else {
            await store.update(Tabla, id, data);
            let userUpdated = await store.query(Tabla, { id: id });
            console.log(userUpdated)
            return userUpdated[0];
        }
    }



    return {
        create,
        findAll,
        findOne,
        update
    };
}
