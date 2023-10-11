import { Router } from "express";
const router = Router();
import passport from "passport";
import postController from "./post.controller";

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

router.patch("/update/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const update = await service.update(id, data);
    res.json(update);
  } catch (error) {
    next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletePost = await service.delete(id);
    res.json(deletePost);
  } catch (error) {
    next(error);
  }
});
export default router;
