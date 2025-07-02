import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("Connecting to:", process.env.MONGODB_URI);
    const conn = await mongoose.connect(process.env.MONGODB_URI,{dbName:"DigiBarta"});
    console.log(`✅ MongoDB connected to DB: ${conn.connection.name} at host: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};
