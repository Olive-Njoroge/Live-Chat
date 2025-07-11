import axios from 'axios';
import io from 'socket.io-client'

const BackendBaseUrl = import.meta.env.VITE_API_BASE_URL;
const APIBaseUrl = `${BackendBaseUrl}/api`;

const API = axios.create({
    baseURL : APIBaseUrl
});
console.log(import.meta.env.VITE_API_BASE_URL);


export const registerUser = (username) => {
    return API.post("/auth/register", {username});
};

export const getRooms = () => {
    return API.get('/rooms');
};

export const createRoom = (name) => {
    return API.post('/rooms', {name});
}

export const getMessages = (roomId) => {
    return API.get(`/messages/${roomId}`);
}

export const socket = io(BackendBaseUrl, {autoConnect: false});
