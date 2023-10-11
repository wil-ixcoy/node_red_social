import express, { json } from "express";
const app = express();

import post from "./components/posts/post.network";
import {config} from "../config";
import { errorHandler, boomErrorHandler } from "../middlewares/error.handler";
import "../utils/index";
app.use(json());

app.use("/api/posts", post);

app.use(boomErrorHandler);
app.use(errorHandler);
app.listen(config.post.port, () => {
  console.log("Microservicio de Post corriendo en el puerto " + config.post.port);
});
