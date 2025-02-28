"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Add from "../Assests/AddIcon.svg";
import Layer from "../Assests/Layers.svg";
import { useRouter } from "next/navigation";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const moviesPerPage = 8;
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("/api/movies");
        if (!res.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await res.json();
        if (data.movies) {
          setMovies(data.movies);
        } else {
          setError("No movies found");
        }
      } catch (error) {
        console.error("❌ Error fetching movies:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (movies.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a2a3a] text-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">Your movie list is empty</h2>
        <button
          onClick={() => router.push("/Add")}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Add a new movie
        </button>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#0a2a3a] text-white flex flex-col items-center">
      <div className="w-full flex justify-between items-center p-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-semibold">My Movies</h1>
          <button onClick={() => router.push("/Add")}>
            <Image src={Add} alt="Add Movie" width={40} height={40} className="cursor-pointer" />
          </button>
        </div>
        <button className="text-white flex items-center space-x-2" onClick={() => router.push("/")}>
          <span>Logout</span>
          <span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.6667 6.66667L16.7867 8.54667L18.8933 10.6667H8V13.3333H18.8933L16.7867 15.44L18.6667 17.3333L24 12L18.6667 6.66667ZM2.66667 2.66667H12V0H2.66667C1.2 0 0 1.2 0 2.66667V21.3333C0 22.8 1.2 24 2.66667 24H12V21.3333H2.66667V2.66667Z" fill="white"/>
            </svg>
          </span>
        </button>
      </div>

      {movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
          {movies.slice((page - 1) * moviesPerPage, page * moviesPerPage).map((movie) => (
            <div
              key={movie._id}
              className="bg-[#0f3b4c] p-3 rounded-lg shadow-lg cursor-pointer"
              onClick={() => router.push(`/Edit?movieId=${movie._id}`)}
              >
              <Image src={movie.imageUrl} alt={movie.title} width={200} height={300} className="rounded-lg w-full" />
              <h3 className="text-lg font-semibold mt-2">{movie.title}</h3>
              <p className="text-gray-300">{movie.year}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>No movies available</div>
      )}

      <div className="flex space-x-4 mt-6">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} className="text-green-400 hover:underline">
          Prev
        </button>
        {[1, 2].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`px-3 py-1 rounded-lg ${page === num ? "bg-green-500 text-white" : "text-green-400 hover:underline"}`}
          >
            {num}
          </button>
        ))}
        <button onClick={() => setPage((prev) => prev + 1)} className="text-green-400 hover:underline">
          Next
        </button>
      </div>

      <div className="relative bottom-0 left-0 w-full">
        <Image src={Layer} alt="Layer Image" layout="responsive" width={1200} height={200} />
      </div>
    </div>
  );
}