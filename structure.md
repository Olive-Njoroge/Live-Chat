# 🧑‍💬 Realtime Group Chat with Socket.IO

## 📌 Project Overview

A real-time group chat application built using **Socket.IO** that allows users to join different chat rooms, send messages instantly, see who is typing, check user presence (online/offline), and manage conversations in real-time.

---

## 🚀 Features

- **Multiple Chat Rooms:** Users can join specific rooms to chat.
- **Typing Indicators:** Shows when someone is typing.
- **Online/Offline Status:** Track who is online or offline.
- **Username:** Every user has a unique identifier or username.
- **Realtime Messaging:** Messages appear instantly without page reload.
- **Data Storage:** Messages and user presence are stored (optionally using a database).
- **REST API Endpoints:**
  - `/room` — Manage chat rooms
  - `/user` — Manage users
  - `/message` — Manage messages

---

## ⚙️ How Socket.IO Powers Live Chat and Online Tracking

- **Realtime Communication:** Socket.IO establishes a persistent WebSocket connection between client and server, enabling instant two-way communication.
- **Joining Rooms:** `socket.join('room-name')` allows users to join specific chat rooms and receive room-specific messages.
- **Typing Status:** Emit and listen to `'typing'` events to display typing indicators in real-time.
- **User Presence:** Broadcast `'user-connected'` and `'user-disconnected'` events to update online status across all clients.
- **Realtime Messaging:** Emit `'chat-message'` events from sender and listen on clients to render new messages instantly.
- **Online Tracking:** Maintain an in-memory or database record of online users, updating it on connect and disconnect events.

---

## 🛠 Tech Stack

- **Frontend:** React.js / Vanilla JS (or your choice)
- **Backend:** Node.js, Express.js
- **WebSocket Library:** Socket.IO
- **Database:** MongoDB / Redis for message and presence storage

---

✅ This structure ensures users can chat in rooms, messages appear instantly, users see when others are typing, and the system reflects real-time online/offline status — all powered by **Socket.IO**.
