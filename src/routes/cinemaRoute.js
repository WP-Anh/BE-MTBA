import express from "express";
import {
  addCinema,
  deleteCinema,
  getCinema,
  updateCinema,
} from "../controllers/cinemaController.js";

const router = express.Router();

router.post("/add", addCinema);

router.get("/get", getCinema);

router.patch("/update/:id", updateCinema);

router.delete("/delete", deleteCinema);
export default router;
