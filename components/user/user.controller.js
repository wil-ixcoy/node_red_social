const Tabla = "users";
/* solo se llama auth y automaticamente usa el index.js */
import AuthController from "../auth/auth.controller";
import { notFound } from "@hapi/boom";
import { insert, list, getOne, update as _update, remove as _remove, query as _query } from "../../store/mysql";

const service = new AuthController();
class UserController {
  async create(data) {
    try {
      const user = {
        name: data.name,
        username: data.username,
      };

      let userCreated = await insert(Tabla, user);
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
    let data = await list(Tabla);
    return data;
  }
  async findOne(id) {
    let user = await getOne(Tabla, id);
    if (user != undefined) {
      return user;
    } else {
      throw notFound("El usuario que buscas no existe");
    }
  }
  async update(id, data) {
    let newUserData = await _update(Tabla, id, data);
    if (newUserData != undefined) {
      return newUserData;
    } else {
      throw notFound("El usuario que se intenta actualizar no existe.");
    }
  }

  async remove(id) {
    return await _remove(Tabla, id);
  }

  async follow(from, to) {
    const followed = await insert(`user_follow`, {
      user_from: from,
      user_to: to,
    });
    return followed;
  }

  async following(id) {
    const join = {};
    join[Tabla] = "user_to";
    const query = { user_from: id };
    const queryResponse = await _query(`user_follow`, query, join);
    return queryResponse;
  }
}
export default UserController;
