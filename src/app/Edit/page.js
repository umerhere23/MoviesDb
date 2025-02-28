"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Layer from "../Assests/Layers.svg";
import Image from "next/image";

export default function EditMovie() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const movieId = searchParams.get("movieId");

  useEffect(() => {
    if (movieId) {
      const fetchMovie = async () => {
        try {
          const res = await fetch(`/api/movies/?id=${movieId}`);
          if (!res.ok) throw new Error("Failed to fetch movie data");
          const data = await res.json();
          setTitle(data?.title ?? "");
          setYear(data?.year ?? "");
          setExistingImage(data?.imageUrl || null);  
        } catch (error) {
          console.error("Error fetching movie:", error);
        }
      };
      fetchMovie();
    }
  }, [movieId]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64Image = reader.result;
        if (base64Image) {
          setExistingImage(base64Image); 
          setImage(base64Image); 
          console.log("Base64 Encoded Image:", base64Image);  
        } else {
          console.error("Error: Base64 image is empty");
        }
      };
    }
  };

  const handleUpdateMovie = async () => {
    if (!title.trim() || !year.trim()) {
      alert("Title and Year are required.");
      return;
    }
  
    const payload = {
      id: movieId,  
      title,
      year,
      imageUrl: image || existingImage,  
    };

    console.log("Sending Payload:", payload);
  
    try {
      const res = await fetch(`/api/movies/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) throw new Error("Failed to update movie");
      router.push("/Movies");
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A2A3A] text-white">
      <h1 className="text-3xl font-semibold mb-6">Edit Movie</h1>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <label className="w-80 h-80 border-2 border-dashed border-gray-400 flex items-center justify-center rounded-lg cursor-pointer hover:border-gray-300">
          {existingImage ? (
            <img
              src={existingImage}
              alt="Movie Poster"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="text-gray-300 text-sm text-center flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 11V14H2V11H0V14C0 15.1 0.9 16 2 16H14C15.1 16 16 15.1 16 14V11H14ZM13 7L11.59 5.59L9 8.17V0H7V8.17L4.41 5.59L3 7L8 12L13 7Z" fill="white"/>
              </svg>
              <span>Drop an image here</span>
            </div>
          )}
          <input type="file" className="hidden" onChange={handleImageUpload} />
        </label>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-72 px-4 py-3 bg-[#123545] text-white rounded-lg outline-none"
          />
          <br />
          <input
            type="text"
            placeholder="Publishing year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-72 px-4 py-3 bg-[#123545] text-white rounded-lg outline-none"
          />

          <div className="flex gap-4">
            <button
              className="px-6 py-2 border border-white text-white rounded-lg hover:bg-gray-700"
              onClick={() => router.push("/")}
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              onClick={handleUpdateMovie}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <Image src={Layer} alt="Layer Image" layout="responsive" width={1200} height={200} />
      </div>
    </div>
  );
}
