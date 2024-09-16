import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Please enter a valid email address"],
        trim: true,
        match: [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            "Please enter a valid email address"
        ]
    },
    username: {
        type: String,
        required: [true, "Please enter your username"],
        trim: true,
        unique: true 
    },
    password: {
        type: String,
        required: [true, "Please create a password"]
    },
})


const userModel = mongoose.model("Users", userSchema)

export default userModel