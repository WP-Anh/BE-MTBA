import mongoose from "mongoose";

const SeatSchema = new mongoose.Schema({
  screenID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Screen",
    required: true,
  },
  seatNo: Number,
  status: { type: String, enum: ["available", "booked"], default: "available" },
});

const SeatModel = mongoose.model("Seat", SeatSchema);

export default SeatModel;
