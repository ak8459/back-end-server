const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../model/user.model');
const jsonwebtoken = require('jsonwebtoken');
const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }


        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.status(404).json({ msg: err.message });
            } else {
                const user = new User({ username, email, password: hash });
                await user.save();
                res.status(200).json({ msg: "User registered successfully" });
            }
        })

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
})

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                const token = jsonwebtoken.sign({ username: user.username, userId: user._id }, 'user-key');
                res.status(200).json({ msg: "Login successful", token });
            } else {
                res.status(400).json({ msg: "Invalid credentials" });
            }
        })
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
})


module.exports = { userRouter }