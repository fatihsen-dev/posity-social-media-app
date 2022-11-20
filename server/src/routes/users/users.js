import express from "express";
import { index, login, register } from "../../controllers/users.js";

const router = express.Router();

router.get("/", index);
router.post("/login", login);
router.post("/usercontrol", login);
router.post("/register", register);

export default router;
