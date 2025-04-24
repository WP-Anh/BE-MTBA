import mongoose from "mongoose";

const ScreenSchema = new mongoose.Schema({
  cinemaID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cinema",
    required: true,
  },
  roomNo: { type: Number, require: true },
  seats: [Number],
});

const ScreenModel = mongoose.model("Screen", ScreenSchema);

export default ScreenModel;
