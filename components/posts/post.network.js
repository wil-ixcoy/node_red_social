const express = require("express");
const router = express.Router();
const passport = require("passport");
const postController = require("./post.controller");

const service = new postController();

router.post("/create", async (req, res, next) => {
  try {
    const data = req.body;
    const post = await service.create(data);
    res.json(post);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const posts = await service.findAll();
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await service.findOne(id);
    res.json(post);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const update = await service.update(id, data);
    res.json(update);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletePost = await service.delete(id);
    res.json(deletePost);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
