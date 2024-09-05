const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateTokenAndSetCookie = (userID, res) => {
    const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
        expiresIn: '30m'
    })
    res.cookie("jwt", token, {
        maxAge: 60 * 60 * 30,
        httpOnly: true //Cookie chỉ có thể truy cập thông qua HTTP
    })
}

module.exports = generateTokenAndSetCookie

// Đoạn mã trên giúp tạo cookie 