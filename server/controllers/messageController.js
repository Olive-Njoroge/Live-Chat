const Messages = require('../models/Message');

exports.getRoomMessages = async(req, res) => {
    const messages = await Messages.find({room : req.params.roomId})
    .populate('sender', 'username')
    .sort({createdAt: 1});
    res.json(messages);
};