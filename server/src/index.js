import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import usersRouter from "./routes/users/users.js";
import postsRouter from "./routes/posts/posts.js";
import rateLimit from "express-rate-limit";
const app = express();

const limiter = rateLimit({
   windowMs: 30 * 60 * 1000,
   max: 100,
   standardHeaders: true,
   legacyHeaders: false,
});

app.use(limiter);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("src/public"));
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.listen(PORT, () => {
   console.log(`Server listen ${PORT}`);
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
