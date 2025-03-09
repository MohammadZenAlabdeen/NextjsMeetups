"use server"
import mongoose from 'mongoose';

const connectMongoDB = async () => {
    const url = process.env.MONGO_DB as string;

    try {
        await mongoose.connect(url);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
}

export default connectMongoDB;
