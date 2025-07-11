const Message = require('../models/Message');
const User = require('../models/user');

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        socket.on("joinRoom", async ({ username, roomId }) => {
            try {
                const user = await User.findOneAndUpdate(
                    { username },
                    { socketId: socket.id, isOnline: true },
                    { new: true, upsert: true }  // ensure user is created if not found
                );

                socket.join(roomId);
                io.to(roomId).emit("userJoined", { user, roomId });

                // Typing events
                socket.on("typing", () => {
                    io.to(roomId).emit("typing", username);
                });

                socket.on("stopTyping", () => {
                    io.to(roomId).emit("stopTyping", username);
                });

                // Send message event
                socket.on("sendMessage", async (messageContent) => {
                    try {
                        const message = await Message.create({
                            sender: user._id,
                            room: roomId,
                            content: messageContent
                        });

                        const fullMessage = await message.populate('sender', 'username');
                        io.to(roomId).emit("newMessage", fullMessage);
                    } catch (err) {
                        console.error("Error sending message:", err.message);
                    }
                });

                // Disconnect event
                socket.on("disconnect", async () => {
                    try {
                        const offlineUser = await User.findOneAndUpdate(
                            { socketId: socket.id },
                            { isOnline: false },
                            { new: true }
                        );

                        if (offlineUser && offlineUser.username) {
                            io.emit("userOffline", offlineUser.username);
                        }
                    } catch (err) {
                        console.error("Error handling disconnect:", err.message);
                    }
                });

            } catch (err) {
                console.error("Error in joinRoom:", err.message);
            }
        });
    });
};
