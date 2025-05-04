import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL!);
        console.log(`MongoDB connected: ${conn.connection.db?.databaseName}`);
    } catch (error) {
        console.error(`Error connecting to database: ${error}`);
        process.exit(1);
    }
}