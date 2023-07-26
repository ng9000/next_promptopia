import mongoose from "mongoose";

//var isConnected = false

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)
    // if (isConnected) {
    //     console.log("Connected");
    //     return
    // }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        // isConnected = true
        //  console.log("mongo db connected");
    } catch (error) {
        console.log(error);
    }
}