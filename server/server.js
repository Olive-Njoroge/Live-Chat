const connectDB = require('./config/db');
const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ CORS configuration for Socket.io
const io = new Server(server, {
  cors: {
    origin: 'https://live-chat-lcqd.vercel.app',  // ✅ Replace with your actual Vercel URL
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// ✅ CORS middleware for Express
app.use(cors({
  origin: 'https://live-chat-lcqd.vercel.app',     // ✅ Same as above
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Socket.io
require('./socket')(io);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/rooms', require('./routes/roomRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

// Database & Start
connectDB();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
