const Tabla = "auth";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { unauthorized } from "@hapi/boom";
import { insert, query, update as _update } from "../../store/mysql";

class AuthController {
  async create(data) {
    try {
      let authData = {};
      authData.user_id = data.id;
      authData.email = data.email;
      authData.password = await hash(data.password, 10);

      return await insert(Tabla, authData);
    } catch (err) {
      return err;
    }
  }
  async login(email, password) {
    const user = await query(Tabla, { email: email });
    if (!user[0]) {
      throw unauthorized("No existe el usuario");
    }
    let isPassword = await compare(password, user[0].password);
    if (!isPassword) {
      throw unauthorized("Contraseña incorrecta");
    }
    const token = await this.tokenJWT(user[0]);
    
    return token;
  }

  async tokenJWT(user) {
    const payload = {
      sub: user.id,
      role:user.role
    };
    const token = sign(payload, "pRd4Kq7t9wBzEfH2jLmNpRwTzWuXy1A4");
    return { user, token };
  }

  async update(id, newEmail) {
    await _update(Tabla, id, { email: newEmail });
  }
}

export default AuthController;
