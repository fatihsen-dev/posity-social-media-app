import express from "express";
import {
   comment,
   createComment,
   createPost,
   deletePost,
   getOnePost,
   index,
   like,
   updatePost,
} from "../../controllers/posts.js";
import multer from "multer";
import { storage } from "../../controllers/posts.js";

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", index);

router.get("/post/:postid", getOnePost);

router.post("/create", upload.single("image"), createPost);

router.post("/delete", deletePost);

router.put("/update", upload.single("image"), updatePost);

router.put("/like", like);

router.get("/comment", comment);

router.post("/comment/create", createComment);

export default router;
