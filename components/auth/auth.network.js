const express = require('express');
const router = express.Router();

const AuthController = require('./auth.controller');

const service = new AuthController();
router.post("/login", async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const loginUser = await service.login(email, password);
        res.json(loginUser);
    } catch (error) {
        next(error);
    }
});


module.exports = router;