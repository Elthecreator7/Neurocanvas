import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type: String, required: true},
    email:{type:String, required:true, unique: true},
    password:{type:String},
    googleId: {type:String, unique:true, sparse:true},
    avatar:{type:String},
    creditBalance: {type:Number, default: 32},
})

const userModel = mongoose.models.user || mongoose.model("user", userSchema)

export default userModel;