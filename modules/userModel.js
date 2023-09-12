import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please name is required"]
    }
    
},{timestamps:false})

export default mongoose.model('User', userSchema) 
