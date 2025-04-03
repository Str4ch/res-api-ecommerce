const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const isProduction = process.env.NODE_ENV === "production"

uri = isProduction ? process.env.DB_CONNECTION :  process.env.LOCAL_DB_CONNECTION;
const mongoConnection = uri || "mongodb://127.0.0.1:27017";

mongoose.set("strictQuery", true)

const connectDB = async () => {
    try {
        await mongoose.connect(mongoConnection)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("No DB connection!", error)
        process.exit(1) // Exit process with failure
    }
}

module.exports = connectDB