import express from "express";
import { create, index } from "../../controllers/posts.js";
import multer from "multer";
import { storage } from "../../controllers/posts.js";

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", index);

router.post("/create", upload.single("image"), create);

export default router;
