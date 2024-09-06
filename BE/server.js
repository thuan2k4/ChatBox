const express = require('express')
const path = require('path')
require('dotenv').config()
const authSign = require('./routers/auth.routes')
const messageRoutes = require('./routers/message.routes')
const userRoutes = require('./routers/user.routes')
const formRoutes = require('./routers/form.routes')
const connectDB = require('./db/connectToMongoDB')
// kết nối database mongodb
const cookieParser = require('cookie-parser')
// giải mã/ phân tích => cookie


const app = express()
const hostname = process.env.HOST_NAME || 'localhost'
const port = process.env.PORT || 5000
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../FE/views'))
app.use(express.static(path.join(__dirname, '../FE/public')))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use('/', formRoutes)
app.use('/api/auth', authSign)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)


app.listen(port, hostname, () => {
    connectDB()
    console.log(`http://localhost:${port}`)
})