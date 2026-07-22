import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    userName:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true}
});

const Auth = mongoose.model('auth',authSchema);

export default Auth;