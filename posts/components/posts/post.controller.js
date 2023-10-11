import boom from "@hapi/boom";
import { insert, list, getOne, update as _update, remove } from "../../../store/mysql";

const Tabla = "posts";

class postController {
  async create(post) {
    let newPost = await insert(Tabla, post);
    return newPost;
  }
  async findAll() {
    let allPosts = await list(Tabla);
    return allPosts;
  }
  async findOne(id) {
    let post = await getOne(Tabla, id);
    return post;
  }
  async update(id, data) {
    let postUpdate = await _update(Tabla, id, data);
    return postUpdate;
  }
  async delete(id) {
    return await remove(Tabla, id);
  }
}

export default postController;
