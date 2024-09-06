const express = require('express')
const router = express.Router()
const authControllers = require('../controllers/authControllers')

router.get('/login', authControllers.login)
router.get('/signup', authControllers.signup)
router.get('/logout', authControllers.logout)
router.get('/', authControllers.home)

module.exports = router