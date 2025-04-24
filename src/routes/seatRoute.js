import express from "express";
import { addSeat, getSeat, updateSeat } from "../controllers/seatController.js";

const router = express.Router();

router.post("/add", addSeat);

router.get("/get", getSeat);

router.patch("/update/:id", updateSeat);

export default router;
