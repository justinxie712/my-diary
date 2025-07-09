import express from "express";
import { register, login } from "../controllers/authController.js";
import {
  createEntry,
  getEntries,
  deleteAllDiaryEntries,
  deleteDiaryEntry,
  updateDiaryEntry,
} from "../controllers/diaryController.js";
import { getAllUsers, getSingleUser } from "../controllers/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Authentication and Authorization Routes
router.post("/register", register);
router.post("/login", login);

// Diary Routes
router.post("/entries", auth, createEntry);
router.put("/entries/:entryId", auth, updateDiaryEntry);
router.delete("/entries/:entryId", auth, deleteDiaryEntry);
router.delete("/entries", auth, deleteAllDiaryEntries);
router.get("/entries", auth, getEntries);

// User Routes
router.get("/users", auth, getAllUsers);
router.get("/users/:userId", auth, getSingleUser);

export default router;
