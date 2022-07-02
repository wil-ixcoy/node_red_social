const express = require('express');
const { Success } = require("../../middlewares/response.handler")
const router = express.Router();

router.get("/", (req, res) => {
    Success(req, res, "Hello World", 200)
}
);

module.exports = router;