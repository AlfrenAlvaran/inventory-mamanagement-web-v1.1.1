import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import asyncHandler from 'express-async-handler';
import userModel from '../models/userModel.js';


// Regiester 
const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;


    if (!validator.isEmail(email)) {
        res.status(400).json({ error: true, message: "Invalid Email format" })
    }

    if (!password || password.lenght < 8) {
        res.status(400).json({ error: true, message: "Password must contain 8 characters" })
    }

    const userExist = await userModel.findOne({ email })
    if (userExist) {
        res.status(400).json({ error: true, message: "USer is already exists" })
    }


    const salt = await bcrypt.genSalt(14)
    const hashed = await bcrypt.hash(password, salt)

    const user = await userModel.create({
        username,
        email,
        password: hashed
    })

    if (user) {
        const token = createToken(user._id)

        res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 + 86400),
            sameSite: 'none',
            secure: true
        })

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token
        })
    }
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
        res.status(400).json({ error: true, message: "user doesn't exist" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        res.status(400).json({ error: true, message: "Wrong Password" })
    }

    const token = createToken(user._id);
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true
    })

    res.status(201).json({ error: false, token })
})


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}


export { register, login }