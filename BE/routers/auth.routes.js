const express = require('express')
const router = express.Router()
const authControllers = require('../controllers/authControllers')


router.post('/login', authControllers.loginUser)
router.post('/signup', authControllers.signupUser)

module.exports = router