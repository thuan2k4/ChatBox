const express = require('express')
const router = express.Router()
const authControllers = require('../controllers/authControllers')


router.get('/login', authControllers.login)
router.post('/login', authControllers.loginUser)
router.get('/signup', authControllers.signup)
router.post('/signup', authControllers.signupUser)
router.get('/logout', authControllers.logout)

module.exports = router