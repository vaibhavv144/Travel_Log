const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose')
const userRoutes = require('./Routes/auth');
const vlogRoutes = require('./Routes/vlog');
const cardRoutes = require('./Routes/card');
const commentRoutes = require('./Routes/comment');
const messageRoutes = require('./Routes/messages');
const expenseRoutes = require('./Routes/expenses');
const storyRoutes = require('./Routes/story');
const matchroutes = require('./Routes/matches');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);//use(socket)
const dotenv = require('dotenv');
const seedDB = require('./seed');
dotenv.config();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});//use


mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("db successfully connected")
})
.catch((err) => {
    console.log("db not connected");
    console.log(err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send({
        message: "welcome to Travel Log"
    })
})

// seedDB();
app.use(matchroutes);
app.use(messageRoutes);
app.use(commentRoutes);
app.use(userRoutes);
app.use(storyRoutes);
app.use(expenseRoutes);
app.use(cardRoutes);
app.use(vlogRoutes);

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('sendMessage', (message) => {
        io.to(message.receiver).emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('connected')
})