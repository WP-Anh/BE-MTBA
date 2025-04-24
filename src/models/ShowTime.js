import mongoose from "mongoose";

const ShowTimeSchema = new mongoose.Schema({
  movieID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  screenID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Screen",
    required: true,
  },
  startTime: Date,
  endTime: Date,
});

const ShowTimeModel = mongoose.model("ShowTime", ShowTimeSchema);

export default ShowTimeModel;
