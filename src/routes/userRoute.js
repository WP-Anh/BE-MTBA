import express from "express";
import {
  register,
  login,
  getProfile,
  getAllProfile,
  changePassword,
} from "../controllers/userController.js";
import { auth } from "../../middleware/auth.js";

const router = express.Router();

// Public quotes
router.post("/register", register);
router.post("/login", login);

router.get("/profile", auth, getProfile);
router.get("/all", getAllProfile);

router.patch("/change", changePassword);

export default router;
