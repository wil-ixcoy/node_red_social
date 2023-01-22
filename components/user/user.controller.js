const Tabla = "users";
/* solo se llama auth y automaticamente usa el index.js */
const auth = require("../auth");
const boom = require("@hapi/boom");
module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../store/dummy");
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
          role: "user",
        });
      }
      return userCreated[0];
    } catch (err) {
      if (err.sqlMessage.includes("Duplicate entry")) {
        throw boom.conflict("El email ya fue registrado");
      } else {
        throw boom.badRequest("Ha sucedido un error");
      }
    }
  }

  async function findAll() {
    try {
      let users = await store.list(Tabla);
      if (users == []) {
        throw boom.notFound("No hay usuarios registrados");
      } else {
        return users;
      }
    } catch (e) {
      throw boom.badRequest("Ha ocurrido un error");
    }
  }

  async function findOne(id) {
    try {
      let user = await store.getOne(Tabla, id);
      if (user === undefined) {
        throw boom.notFound("El usuario no existe");
      } else {
        return user;
      }
    } catch (e) {
      throw boom.badRequest("Ha ocurrido un error");
    }
  }

  async function update(id, data) {
    if (data.role) {
      throw boom.badRequest("No se puede cambiar el rol");
    } else if (data.email) {
      await store.update(Tabla, id, { email: data.email });
      let userUpdated = await store.query(Tabla, { email: data.email });
      await auth.update(userUpdated[0].id, userUpdated[0].email);
      return userUpdated[0];
    } else {
      await store.update(Tabla, id, data);
      let userUpdated = await store.query(Tabla, { id: id });
      console.log(userUpdated);
      return userUpdated[0];
    }
  }

  async function remove(id) {
    await store.remove("users", id);
    return await store.remove("auth", id);
  }

  return {
    create,
    findAll,
    findOne,
    update,
    remove,
  };
};
