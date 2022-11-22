import express from "express";
import { index, login, register, userControl } from "../../controllers/users.js";

const router = express.Router();

router.get("/", index);
router.post("/login", login);
router.post("/usercontrol", userControl);
router.post("/register", register);

export default router;
