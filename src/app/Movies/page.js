"use client";

import { useState } from "react";
import Image from "next/image";
import movie1 from "../Assests/movie.svg";  
import movie2 from "../Assests/movies.svg";  

const movies = [
  { id: 1, title: "Movie 1", year: "2021", image: movie1 },
  { id: 2, title: "Movie 1", year: "2021", image: movie2 },
  { id: 3, title: "Movie 1", year: "2021", image: movie1 },
  { id: 4, title: "Movie 1", year: "2021", image: movie2 },
  { id: 5, title: "Movie 1", year: "2021", image: movie1 },
  { id: 6, title: "Movie 1", year: "2021", image: movie2 },
  { id: 7, title: "Movie 1", year: "2021", image: movie1 },
  { id: 8, title: "Movie 1", year: "2021", image: movie2 },
];

export default function MoviesPage() {
  const [page, setPage] = useState(1);
  const moviesPerPage = 8;
  const totalPages = 2;

  return (
    <div className="min-h-screen bg-[#0a2a3a] text-white flex flex-col items-center">
       <div className="w-full flex justify-between items-center p-6">
        <h1 className="text-3xl font-semibold">My Movies <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1_106)">
<path d="M17.3333 9.33335H14.6667V14.6667H9.33332V17.3334H14.6667V22.6667H17.3333V17.3334H22.6667V14.6667H17.3333V9.33335ZM16 2.66669C8.63999 2.66669 2.66666 8.64002 2.66666 16C2.66666 23.36 8.63999 29.3334 16 29.3334C23.36 29.3334 29.3333 23.36 29.3333 16C29.3333 8.64002 23.36 2.66669 16 2.66669ZM16 26.6667C10.12 26.6667 5.33332 21.88 5.33332 16C5.33332 10.12 10.12 5.33335 16 5.33335C21.88 5.33335 26.6667 10.12 26.6667 16C26.6667 21.88 21.88 26.6667 16 26.6667Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_1_106">
<rect width="32" height="32" fill="white"/>
</clipPath>
</defs>
</svg>
</h1>
        <button className="text-white flex items-center space-x-2">
          <span>Logout</span>
          <span>↗</span>
        </button>
      </div>

       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
        {movies.slice((page - 1) * moviesPerPage, page * moviesPerPage).map((movie) => (
          <div key={movie.id} className="bg-[#0f3b4c] p-3 rounded-lg shadow-lg">
            <Image src={movie.image} alt={movie.title} className="rounded-lg w-full" />
            <h3 className="text-lg font-semibold mt-2">{movie.title}</h3>
            <p className="text-gray-300">{movie.year}</p>
          </div>
        ))}
      </div>

       <div className="flex space-x-4 mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="text-green-400 hover:underline"
        >
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
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          className="text-green-400 hover:underline"
        >
          Next
        </button>
      </div>
    </div>
  );
}
