const Tabla = "users";
/* solo se llama auth y automaticamente usa el index.js */
const AuthController = require("../auth/auth.controller");
const boom = require("@hapi/boom");
const Store = require("../../store/mysql");

const service = new AuthController();
class UserController {
  async create(data) {
    try {
      const user = {
        name: data.name,
        username: data.username,
      };

      let userCreated = await Store.insert(Tabla, user);
      console.log(userCreated);
      const authData = {
        id: userCreated.id,
        email: data.email,
        password: data.password,
      };

      await service.create(authData);
      let token = await service.login(data.email, data.password);
      let tokenJWT = token.token;
      return {
        userCreated,
        tokenJWT,
      };
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    let data = await Store.list(Tabla);
    return data;
  }
  async findOne(id) {
    let user = await Store.getOne(Tabla, id);
    if (user != undefined) {
      return user;
    } else {
      throw boom.notFound("El usuario que buscas no existe");
    }
  }
  async update(id, data) {
    let newUserData = await Store.update(Tabla, id, data);
    if (newUserData != undefined) {
      return newUserData;
    } else {
      throw boom.notFound("El usuario que se intenta actualizar no existe.");
    }
  }

  async remove(id) {
    return await Store.remove(Tabla, id);
  }

  async follow(from, to) {
    const followed = await Store.insert(`user_follow`, {
      user_from: from,
      user_to: to,
    });
    return followed;
  }

  async following(id) {
    const join = {};
    join[Tabla] = "user_to";
    const query = { user_from: id };
    const queryResponse = await Store.query(`user_follow`, query, join);
    return queryResponse;
  }
}
module.exports = UserController;
