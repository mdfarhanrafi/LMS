import mongoose from "mongoose"

const URI = process.env.MONGO_URI

const connectDB = async() => {
    try {
        await mongoose.connect(URI)
        console.log("Connection established")
    } catch (error) {
        console.log("Connection failed to db");
        process.exit(0)        
    }
}

export default connectDB

