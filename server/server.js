const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ List of allowed origins (add your frontend URLs here)
const allowedOrigins = [
  'http://localhost:5173',                      // Local dev
  'https://live-chat-frontend-f4yv.onrender.com', // Render frontend
  'https://live-chat-c47b.vercel.app/'            // Vercel frontend
];

// ✅ Express CORS setup
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

// ✅ Socket.IO CORS setup
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// ✅ Initialize socket handlers
require('./socket')(io);

// ✅ API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/rooms', require('./routes/roomRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

// ✅ Connect to MongoDB
connectDB();

// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
