import mongoose from "mongoose";

async function connectMongoDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected!!");
    } catch (error) {
        console.log(error);
    }
};

export default connectMongoDB;