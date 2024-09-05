const express = require('express')
const router = express.Router()
const messageControllers = require('../controllers/messageController.js')
const protectRoute = require('../middleware/protectRoute.js')

router.get("/:id", protectRoute, messageControllers.getMessages)
router.post('/send/:id', protectRoute, messageControllers.sendMessage)

module.exports = router