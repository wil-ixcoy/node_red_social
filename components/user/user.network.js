const express = require('express');
const { Success } = require("../../middlewares/response.handler")
const router = express.Router();

const Controller = require('./user.controller');

router.get("/", async (req, res) => {
    const lista = await Controller.listUsers();
    Success(req, res, lista, 200)
}
);

module.exports = router;