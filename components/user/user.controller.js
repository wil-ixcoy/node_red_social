const Tabla = "users";
/* solo se llama auth y automaticamente usa el index.js */
/* const AuthService = require("../auth");
 */const boom = require("@hapi/boom");
const Store = require("../../store/mysql");


class UserController {

  async create(data) {
    try {
      const user = {
        name: data.name,
        username: data.username,
        email: data.email,
        role: "user",
        created_at: new Date()
      };
     let userCreated = await Store.insert(Tabla, user);
     console.log(userCreated);
      return userCreated;
    } catch (err) {
      console.log(err)
    }
  }

  async findAll() {
  let  data =await Store.list(Tabla)
  return data;
  }
  async findOne(id) {
    let user = await Store.getOne(Tabla,id);
    if(user != undefined){
      return user
    }else{
      throw boom.notFound("El usuario que buscas no existe")
    }
  }
  async update() {}

  async remove(id) {
    let check = await  this.findOne(id);
    return await Store.remove(Tabla,id)
  }
}
module.exports = UserController;