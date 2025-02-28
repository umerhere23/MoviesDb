import mongoose from "mongoose";
import { NextResponse } from "next/server";

 const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/moviesDB";

 async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ Database Connected Successfully");
  } catch (error) {
    console.error("❌ Database Connection Error:", error);
  }
}

 const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: String, required: true },
  imageUrl: { type: String },
});

const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);

export async function GET(req) {
  await connectDB();
  console.log("📢 GET Request Received");

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");  

    if (id) {
      console.log(`📢 Fetching Movie with ID: ${id}`);
      const movie = await Movie.findById(id).lean();

      if (!movie) {
        console.error("❌ Movie Not Found");
        return NextResponse.json({ success: false, error: "Movie not found" }, { status: 404 });
      }

      console.log("✅ Movie Fetched Successfully:", movie);
      return NextResponse.json({ success: true, movie }, { status: 200 });
    } else {
      console.log("📢 Fetching All Movies");
      const movies = await Movie.find().lean();
      console.log("✅ Movies Fetched Successfully:", movies);
      return NextResponse.json({ success: true, movies }, { status: 200 });
    }
  } catch (error) {
    console.error("❌ Error Fetching Movies:", error);
    return NextResponse.json({ success: false, error: "Error fetching movies" }, { status: 500 });
  }
}

 export async function POST(req) { 
  await connectDB();
  console.log("📢 POST Request Received");

  try {
    const body = await req.json();
    console.log("📩 Received Data:", body);

    const { title, publishingYear, image } = body;

    if (!title || !publishingYear) {
      console.error("❌ Validation Error: Title and Publishing Year are required");
      return NextResponse.json({ error: "Title and Publishing Year are required" }, { status: 400 });
    }

    const newMovie = new Movie({ title, year: publishingYear, imageUrl: image });
    await newMovie.save();

    console.log("✅ Movie Added Successfully:", newMovie);
    return NextResponse.json({ message: "Movie added successfully", movie: newMovie });

  } catch (error) {
    console.error("❌ Error Adding Movie:", error);
    return NextResponse.json({ error: "Error adding movie" }, { status: 500 });
  }
}


export async function PUT(req) {
  await connectDB();
  console.log("📢 PUT Request Received");

  try {
    const body = await req.json();
    console.log("📩 Received Data:", body);

    const { id, title, year, imageUrl } = body;

    if (!id) {
      console.error("❌ Validation Error: Movie ID is required");
      return NextResponse.json({ error: "Movie ID is required" }, { status: 400 });
    }

    const updateData = { title, year };

    if (imageUrl) {
      updateData.imageUrl = imageUrl; 
    }

    const updatedMovie = await Movie.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedMovie) {
      console.error("❌ Error: Movie Not Found");
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    console.log("✅ Movie Updated Successfully:", updatedMovie);
    return NextResponse.json({ message: "Movie updated", movie: updatedMovie });
  } catch (error) {
    console.error("❌ Error Updating Movie:", error);
    return NextResponse.json({ error: "Error updating movie" }, { status: 500 });
  }
}