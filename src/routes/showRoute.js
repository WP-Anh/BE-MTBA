import express from "express";
import {
  addShow,
  deleteShow,
  getShow,
  updateShow,
} from "../controllers/showController.js";

const router = express.Router();

router.post("/add", addShow);

router.get("/get", getShow);

router.patch("/patch/:id", updateShow);

router.delete("/delete", deleteShow);
export default router;
