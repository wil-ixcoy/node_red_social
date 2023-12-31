import { Router } from "express";
const router = Router();
import { authenticate } from "passport";
import userController from "./user.controller";
import { checkRoles } from "../../middlewares/auth.handler";

const service = new userController();

router.post("/create", async (req, res, next) => {
  try {
    const data = req.body;
    const newUser = await service.create(data);
    res.json(newUser);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const lista = await service.findAll();
    res.json(lista);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const user = await service.findOne(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});
router.patch(
  "/update/:id",
  authenticate("jwt", { session: false }),
  checkRoles("user"),
  async (req, res, next) => {
    try {
      const user = await service.update(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/delete/:id",
  authenticate("jwt", { session: false }),
  checkRoles("user"),
  async (req, res, next) => {
    try {
      const user = await service.remove(req.params.id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/follow/:id",
  authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      //quien - desde
      const from = req.body.user_from;
      // a quien - hacia
      const to = req.params.id;
      await service.follow(from, to);
      res.json({
        message: "siguiendo",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/following/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const following = await service.following(id);
    res.json(following);
  } catch (error) {
    next(error);
  }
});
export default router;
