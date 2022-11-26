import express from "express";
import { create, index, like } from "../../controllers/posts.js";
import multer from "multer";
import { storage } from "../../controllers/posts.js";

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", index);

router.post("/create", upload.single("image"), create);

router.post("/like/:postid", like);

export default router;
