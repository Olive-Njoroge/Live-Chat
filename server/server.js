const connectDB = require('./config/db');
const express = require('express')
const dotenv = require('dotenv');
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');

dotenv.config();


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors : {origin: "*"}
});   //only allows that port to be accessible

//Socket.io
require('./socket')(io);

//middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/rooms', require('./routes/roomRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

//DB & start
connectDB();

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
