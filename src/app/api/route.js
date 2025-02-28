import mongoose from "mongoose";
import { NextResponse } from "next/server";

 const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/moviesDB";

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Database Connected");
  } catch (error) {
    console.error("Database Connection Error:", error);
  }
}

 const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: String, required: true },
  imageUrl: { type: String },
});

const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);

 export async function GET() {
  await connectDB();
  try {
    const movies = await Movie.find();
    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching movies" }, { status: 500 });
  }
}

 export async function POST(req) {
  await connectDB();
  try {
    const { title, year, imageUrl } = await req.json();
    const newMovie = new Movie({ title, year, imageUrl });
    await newMovie.save();
    return NextResponse.json({ message: "Movie added successfully", movie: newMovie });
  } catch (error) {
    return NextResponse.json({ error: "Error adding movie" }, { status: 500 });
  }
}

 export async function PUT(req) {
  await connectDB();
  try {
    const { id, title, year, imageUrl } = await req.json();
    const updatedMovie = await Movie.findByIdAndUpdate(id, { title, year, imageUrl }, { new: true });
    return NextResponse.json({ message: "Movie updated", movie: updatedMovie });
  } catch (error) {
    return NextResponse.json({ error: "Error updating movie" }, { status: 500 });
  }
}
