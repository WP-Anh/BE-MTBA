import express from "express";
import {
  addScreen,
  deleteScreen,
  getScreen,
  updateScreen,
} from "../controllers/screenController.js";

const router = express.Router();

router.post("/add", addScreen);

router.get("/get", getScreen);

router.patch("/update/:id", updateScreen);

router.delete("/delete", deleteScreen);
export default router;
