"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Layer from "../app/Assests/Layers.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

     const validEmail = "admin@example.com";
    const validPassword = "admin123";

    if (email === validEmail && password === validPassword) {
      toast.success("Login successful!");
      setTimeout(() => router.push("/Movies"), 1500);
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#0a2a3a] overflow-hidden">
      <div className="bg-[#0f3b4c] p-10 rounded-lg shadow-lg w-96 relative z-10">
        <h2 className="text-white text-3xl font-semibold text-center mb-6">Sign in</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#183e4f] text-white rounded-lg outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#183e4f] text-white rounded-lg outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="mb-4 flex items-center">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-white text-sm">Remember me</label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
          >
            Login
          </button>
        </form>
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <Image src={Layer} alt="Layer Image" layout="responsive" width={1200} height={200} />
      </div>
    </div>
  );
}
