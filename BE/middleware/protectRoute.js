const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/users.model')


const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt // lấy cookie
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET) // giải mã token cookie khi có JWT_SCRET_KEY
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Provided" }) // Không tồn tại token
        }
        const user = await User.findById(decoded.userID)
        if (!user) {
            return res.status(401).json({ error: "User not found" }) // không tồn tại user
        }
        req.user = user
        next()
        // next là để dùng để chuyển quyền xử lý cho middleware hoặc các route handler tiếp theo
    } catch (error) {
        res.status(500).json({
            error: "Internal server error (Authorized)"
        })
    }
}

module.exports = protectRoute