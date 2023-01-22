const express = require("express");
const router = express.Router();
const passport = require("passport");
const Controller = require("./index.js");
const { checkRoles } = require("../../middlewares/auth.handler");
router.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const newUser = await Controller.create(data);
    res.json(newUser);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const lista = await Controller.findAll();
    res.json(lista);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const user = await Controller.findOne(req.params.id);
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
      const user = await Controller.update(req.params.id, req.body);
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
      const user = await Controller.remove(req.params.id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
