const express = require('express')
require('dotenv').config()
const authSign = require('./routers/auth.routes')
const messageRoutes = require('./routers/message.routes')
const userRoutes = require('./routers/user.routes')
const connectDB = require('./db/connectToMongoDB')
// kết nối database mongodb
const cookieParser = require('cookie-parser')
// giải mã/ phân tích => cookie


const app = express()
const hostname = process.env.HOST_NAME || 'localhost'
const port = process.env.PORT || 5000
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use('/api/auth', authSign)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)


app.get('/', (req, res) => {
    res.redirect("/api/auth/login")
})

app.listen(port, hostname, () => {
    connectDB()
    console.log(`Server is running in port: ${port}`)
})