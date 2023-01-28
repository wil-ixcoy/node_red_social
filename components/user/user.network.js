const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("./user.controller");
const { checkRoles } = require("../../middlewares/auth.handler");

const service = new userController();

router.post("/", async (req, res, next) => {
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
  "/:id",
  passport.authenticate("jwt", { session: false }),
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
  "/:id",
  passport.authenticate("jwt", { session: false }),
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
module.exports = router;
