import mongoose from "mongoose";


export const connectDB =async()=>{
    await mongoose.connect('mongodb+srv://greatestack:863930@cluster0.xhaaf.mongodb.net/food_del?retryWrites=true&w=majority').then(()=>console.log("db connected"));
}