import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

 const users = [
  {
    id: 1,
    email: "user@example.com",
    password: "$2a$10$8cZo2R0vH60sJhVzOObA5OUcHjJvNppybGZYOquslv7sE2GGN.wQG", // bcrypt hash for "password123"
  },
];

const SECRET_KEY = "your_secret_key"; 

export async function POST(req) {
  try {
    const { email, password } = await req.json();

     const user = users.find((user) => user.email === email);
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

     const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

     const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return NextResponse.json({ message: "Login successful", token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
