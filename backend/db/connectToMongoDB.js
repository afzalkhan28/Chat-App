import mongoose from "mongoose";

const connectToMongoDB = async (req,res) => {
try {
    await mongoose.connect(process.env.MONGO_DB_URI,)
    console.log("Connected to mongodb");
    
    
    
} catch (error) {
    console.log("error db is connected", error.message); 
}
}
export default connectToMongoDB;