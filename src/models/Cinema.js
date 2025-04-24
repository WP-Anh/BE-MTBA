import mongoose from "mongoose";

const CinemaSchema = new mongoose.Schema({
  cinemaName: { type: String, required: true },
  address: { type: String, required: true },
  contact_number: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
});

const CinemaModel = mongoose.model("Cinema", CinemaSchema);

export default CinemaModel;
