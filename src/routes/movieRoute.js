import express from "express";
import {
  addNewMovie,
  deleteMovie,
  getMovie,
  updateMovie,
} from "../controllers/movieController.js";

const router = express.Router();

router.post("/add", addNewMovie);

router.get("/get", getMovie);

router.patch("/update/:id", updateMovie);

router.delete("/delete", deleteMovie);
export default router;
