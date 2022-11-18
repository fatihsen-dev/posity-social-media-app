import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
const app = express();
import mongoose from "mongoose";
import cors from "cors";
import usersRouter from "./routes/users/users.js";
import postsRouter from "./routes/posts/posts.js";

app.use(bodyParser.urlencoded({ extended: false }));
dotenv.config();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.port || 5000;

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.listen(port, () => {
  console.log(`Server listen ${port}`);
});

(async () => {
  try {
    await mongoose.connect(process.env.DBURL);
    console.log("connected mongodb");
  } catch (err) {
    console.log(err);
  }
})();
app.get("/", (req, res) => {
  res.send({ message: "success" });
});
