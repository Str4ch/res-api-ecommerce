const mongoose = require("mongoose")
const dotenv = require("dotenv")
uri = process.env.DB_CONNECTION
const mongoConnection = "mongodb://127.0.0.1:27017" || uri;

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