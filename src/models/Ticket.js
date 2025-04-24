import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
  showID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShowTime",
    required: true,
  },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  screenID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Screen",
    required: true,
  },
  seatID: { type: mongoose.Schema.Types.ObjectId, ref: "Seat", required: true },
  price: Number,
  status: {
    type: String,
    enum: [
      "booked",
      "cancelled",
      "completed",
      "expired",
      "refunded",
      "checked_in",
      "no_show",
      "blocked",
    ],
    default: "",
  },
  expiresAt: Date,
});

const TicketModel = mongoose.model("Ticket", TicketSchema);

export default TicketModel;
