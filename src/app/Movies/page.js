"use client";

import { useState } from "react";
import Image from "next/image";
import movie1 from "../Assests/movie.svg";  
import movie2 from "../Assests/movies.svg";  
import Add from "../Assests/AddIcon.svg";  
import Layer from "../Assests/Layers.svg"
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  return (
    <>
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
        <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.6667 6.66667L16.7867 8.54667L18.8933 10.6667H8V13.3333H18.8933L16.7867 15.44L18.6667 17.3333L24 12L18.6667 6.66667ZM2.66667 2.66667H12V0H2.66667C1.2 0 0 1.2 0 2.66667V21.3333C0 22.8 1.2 24 2.66667 24H12V21.3333H2.66667V2.66667Z" fill="white"/>
</svg>
</span>
      </button>
    </div>

     <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
      {movies.slice((page - 1) * moviesPerPage, page * moviesPerPage).map((movie) => (
        <div key={movie.id} className="bg-[#0f3b4c] p-3 rounded-lg shadow-lg">
          <Image src={movie.image} alt={movie.title} className="rounded-lg w-full cursor-pointer" />
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
    <div className="relative bottom-0 left-0 w-full">
  <Image 
    src={Layer} 
    alt="Layer Image" 
    layout="responsive" 
    width={1200} 
    height={200} 
  />
</div>
  </div>

   </>
);
}