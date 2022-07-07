const express = require('express');
const router = express.Router();

const Controller = require('./index.js');

router.post("/login", async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const loginUser = await Controller.login(email, password);
        res.json(loginUser);
    } catch (error) {
        next(error);
    }
});


module.exports = router;