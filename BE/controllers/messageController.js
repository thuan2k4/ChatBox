const Conversation = require('../models/conversation.model')
const Message = require('../models/message.model')

class messageControllers {

    async sendMessage(req, res) {
        try {
            const { message } = req.body
            const { id: receiverId } = req.params
            const senderId = req.user._id
            let conversation = await Conversation.findOne({
                //truy vấn tất cả cuộc trò chuyện giữa 2 id user
                participants: { $all: [senderId, receiverId] }
            })
            // Nếu không có thì tạo cuộc trò chuyện giữa 2 người
            if (!conversation) {
                conversation = await Conversation.create({
                    participants: [senderId, receiverId]
                })
            }
            //Tạo tin nhắn giữa 2 người
            const newMessages = new Message({
                senderId,
                receiverId,
                message,
            })
            await newMessages.save()
            //Đẩy tin nhắn vào lịch sử trò chuyện
            if (newMessages) {
                conversation.messages.push(newMessages._id)
            }
            await conversation.save()
            res.status(201).json(newMessages)
        } catch (error) {
            res.status(500).json({
                error: "Internal server error (Message)"
            })
        }
    }
    async getMessages(req, res) {
        // Tìm cuộc trò chuyện giữa 2 user
        try {
            const { id: userToChatId } = req.params
            const sendId = req.user._id
            const conversation = await Conversation.findOne({
                participants: { $all: [sendId, userToChatId] }
            }).populate("messages") // hiển thị chi tiết tin nhắn
            if(!conversation){
                res.status(200).json([])
            }
            res.status(200).json(conversation.messages)
        } catch (err) {
            res.status(500).json({
                message: err,
                error: "Internal server error (Message)"
            })
        }
    }
}

module.exports = new messageControllers