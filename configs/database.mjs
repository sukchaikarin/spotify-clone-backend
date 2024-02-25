import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// Initialize MongoClient with the connection string from environment variables
const client = new MongoClient(process.env.DATABASE_URI);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Successfully connected to MongoDB.");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

// Call the async function to establish the database connection
connectToDatabase();

export default client;
