"use client";

import { useState } from "react";
import Layer from "../Assests/Layers.svg";
import Image from "next/image";

export default function CreateMovie() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!title || !year || !file) {
      setMessage("Please fill all fields and upload an image.");
      return;
    }

    setLoading(true);
    setMessage("");

     const base64Image = await toBase64(file);

    const movieData = {
      title,
      publishingYear: Number(year),
      image: base64Image,  
    };

    try {
      const response = await fetch("/Add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movieData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Movie added successfully!");
        setTitle("");
        setYear("");
        setImage(null);
        setFile(null);
      } else {
        setMessage(data.error || "Failed to add movie.");
      }
    } catch (error) {
      setMessage("Error submitting movie.");
    } finally {
      setLoading(false);
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A2A3A] text-white">
      <h1 className="text-3xl font-semibold mb-6">Create a new movie</h1>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <label className="w-80 h-80 border-2 border-dashed border-gray-400 flex items-center justify-center rounded-lg cursor-pointer hover:border-gray-300">
          {image ? (
            <img src={image} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <div className="text-gray-300 text-sm text-center flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M14 11V14H2V11H0V14C0 15.1 0.9 16 2 16H14C15.1 16 16 15.1 16 14V11H14ZM13 7L11.59 5.59L9 8.17V0H7V8.17L4.41 5.59L3 7L8 12L13 7Z"
                  fill="white"
                />
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
            <button className="px-6 py-2 border border-white text-white rounded-lg hover:bg-gray-700">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
          {message && <p className="text-red-400">{message}</p>}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full">
        <Image src={Layer} alt="Layer Image" layout="responsive" width={1200} height={200} />
      </div>
    </div>
  );
}
