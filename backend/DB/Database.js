import mongoose from "mongoose";

export const connectDB = async (req, res) => {
    const db = process.env.MONGO_URL;

    const {connection} = await mongoose.connect('mongodb://localhost:27017/EPT', { useNewUrlParser: true });

    console.log(`MongoDB Connected to ${connection.host}`);

}