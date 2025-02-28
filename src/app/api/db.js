import mongoose from "mongoose";

const MONGO_URI =  "mongodb+srv://EVS:Ws5cSl1OKxbf2XSm@cluster0.7olrq.mongodb.net/";

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
}
