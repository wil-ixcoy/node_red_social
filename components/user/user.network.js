const express = require('express');
const router = express.Router();

const Controller = require('./index.js');

router.post("/", async (req, res, next) => {
    try {
        const data = req.body;
        const newUser = await Controller.create(data);
        res.json(newUser)
    } catch (error) {
        next(error);
    }
});
router.get("/", async (req, res, next) => {
    try {
        const lista = await Controller.findAll();
        res.json(lista)
    } catch (error) {
        next(error);
    }
});
router.get("/:id", async (req, res, next) => {
    try {
        const user = await Controller.findOne(req.params.id);
        res.json(user)
    } catch (error) {
        next(error);
    }
});

module.exports = router;