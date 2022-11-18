import express from "express";
import { create, index } from "../../controllers/posts.js";

const router = express.Router();

router.get("/", index);

router.post("/create", create);

export default router;
