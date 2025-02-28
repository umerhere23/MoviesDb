import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  publishingYear: { type: Number, required: true },
});

export default mongoose.models.Movie || mongoose.model("Movie", MovieSchema);
