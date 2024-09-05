const User = require('../models/users.model')
const bcryptjs = require('bcryptjs') //thư viện mã hóa mật khẩu
const generateTokenAndSetCookie = require('../utils/generateTokenJS')

class authControllers {
    // GET /login
    login(req, res) {
        res.send("Login")
    }

    //POST /login
    async loginUser(req, res) {
        try {
            const { username, password } = req.body
            const findUser = await User.findOne({ username })
            const isPasswordCorrect = await bcryptjs.compare(password, findUser.password)
            if (!isPasswordCorrect || !findUser) {
                res.status(400).json({ error: "Invalid username or password" })
            }
            generateTokenAndSetCookie(findUser._id, res)
            res.status(200).json({ message: "Login Successfull" })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    
    // GET /signup
    signup(req, res) {
        res.send("Signup")
    }
    // POST /singup
    async signupUser(req, res) {
        try {
            const { fullName, username, password, confirmPassword, gender } = req.body
            if (password !== confirmPassword) {
                res.status(400).json({ Error: "Password dont match" })
            }
            const user = await User.findOne({ username })
            if (user) {
                return res.status(400).json({ Error: "Username already exists" })
            }
            const salt = await bcryptjs.genSalt(10) // tạo chuỗi muối là 10
            const hashedPassword = await bcryptjs.hash(password, salt) // thiết lập mã hóa pass với chuỗi muối
            const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`
            const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`
            const newUser = new User({
                fullName,
                username,
                password: hashedPassword,
                gender,
                profilePic: gender === 'male' ? boyProfile : girlProfile
            })
            if (newUser) {
                generateTokenAndSetCookie(newUser._id, res)
                await newUser.save()
                res.status(201).json({
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    username: newUser.username,
                    profilePic: newUser.profilePic
                })
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    // GET /logout
    logout(req, res) {
        try {
            res.cookie("jwt", { maxAge: 0 })
            res.status(200).json({ message: "Logged out Successfully" })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

}

module.exports = new authControllers