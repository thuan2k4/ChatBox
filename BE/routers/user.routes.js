const express = require('express')
const router = express.Router()
const protectRoute = require('../middleware/protectRoute.js')
const userInteraction = require('../controllers/userControllers.js')

router.get('/', protectRoute, userInteraction.getUsersForSidebar)

module.exports = router