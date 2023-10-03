const boom = require("@hapi/boom");
const Store = require("../../../store/mysql");

const Tabla = "posts";

class postController {
  async create(post) {
    let newPost = await Store.insert(Tabla, post);
    return newPost;
  }
  async findAll() {
    let allPosts = await Store.list(Tabla);
    return allPosts;
  }
  async findOne(id) {
    let post = await Store.getOne(Tabla, id);
    return post;
  }
  async update(id, data) {
    let postUpdate = await Store.update(Tabla, id, data);
    return postUpdate;
  }
  async delete(id) {
    return await Store.remove(Tabla, id);
  }
}

module.exports = postController;
