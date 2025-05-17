import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  releaseDate: Date,
  duration: Number,
  genre: [String],
  director: String,
  cast: [String],
  posterUrl: String,
  trailerUrl: String,
  img: [String],
  rating: Number,
  price: Number,
});

const MovieModel = mongoose.model("Movie", MovieSchema);

export default MovieModel;
