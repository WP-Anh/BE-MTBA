import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  director: String,
  genre: [String],
  duration: Number,
  rating: Number,
  release_date: Date,
  poster: String,
  img: [String],
});

const MovieModel = mongoose.model("Movie", MovieSchema);

export default MovieModel;
