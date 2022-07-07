const express = require('express');
const { Success } = require("../../middlewares/response.handler")
const router = express.Router();

const Controller = require('./index.js');

router.post("/", async (req, res, next) => {
    try {
        const data = req.body;
        const newUser = await Controller.create(data);
        Success(req, res, newUser, 200)
    } catch (error) {
        next(error);
    }
});
router.get("/", async (req, res, next) => {
    try {
        const lista = await Controller.findAll();
        Success(req, res, lista, 200)
    } catch (error) {
        next(error);
    }
});
router.get("/:id", async (req, res, next) => {
    try {
        const user = await Controller.findOne(req.params.id);
        Success(req, res, user, 200)
    } catch (error) {
        next(error);
    }
});

module.exports = router;