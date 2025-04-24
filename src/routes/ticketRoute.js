import express from "express";
import { addTicket, showTicket } from "../controllers/ticketController.js";

const router = express.Router();

router.post("/add", addTicket);

router.post("/show", showTicket);

export default router;
