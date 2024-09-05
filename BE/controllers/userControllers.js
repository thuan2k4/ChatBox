const User = require('../models/users.model')

class userInteraction {
    async getUsersForSidebar(req, res) {
        try {
            const loggedInUserId = req.user._id
            const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } })
            // tìm tất cả user theo id (trừ user đang dùng)
            res.status(200).json(filteredUsers)
        } catch (error) {
            res.status(500).json({ error: "Internal server error (userSideBar)" })
        }
    }
}

module.exports = new userInteraction