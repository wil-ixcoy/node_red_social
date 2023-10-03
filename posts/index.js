const express = require("express");
const app = express();

const post = require("./components/posts/post.network");
const { config } = require("../config");
const {
  errorHandler,
  boomErrorHandler,
} = require("../middlewares/error.handler");
require("../utils/index");
app.use(express.json());

app.use("/api/posts", post);

app.use(boomErrorHandler);
app.use(errorHandler);
app.listen(config.post.port, () => {
  console.log("Server is running on port " + config.post.port);
});
