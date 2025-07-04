import express from "express";
import { register, login } from "../controllers/authController.js";
import { createEntry, getEntries } from "../controllers/diaryController.js";
import { getAllUsers } from "../controllers/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/entries", auth, createEntry);
router.get("/entries", auth, getEntries);
router.get("/users", auth, getAllUsers);

export default router;
