const express = require('express');
const router = express.Router();
const Message = require('../Models/Message');
const User = require('../Models/User');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
router.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
router.use(cookieParser());
//what
router.get('/allconversations', async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            res.status(400).json({ msg: "something wrong" });
        }
        else {
            jwt.verify(token, process.env.SECRET_KEY, {}, async (err, info) => {
                if (err) throw err;

                const messages = await Message.find({ $or: [{ sender: info.id }, { receiver: info.id }] }).populate('sender', 'username').populate('receiver', 'username').sort({ createdAt: -1 });
                const conversations = {};

                messages.forEach(message => {
                    const otherUser = message.sender._id.equals(info.id) ? message.receiver : message.sender;
                    if (!conversations[otherUser._id]) {
                        conversations[otherUser._id] = {
                            user: otherUser,
                            messages: []
                        };
                    }
                    conversations[otherUser._id].messages.push(message);
                });
                res.json(Object.values(conversations));
            });
        }
    }
    catch (e) {
        res.status(400).json({ msg: "something wrong" });
    }
});


router.post('/send/message', async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            res.status(400).json({ msg: "something wrong" });
        }
        else {
            jwt.verify(token, process.env.SECRET_KEY, {}, async (err, info) => {
                if (err) throw err;
                const { receiver, text } = req.body;
                const message = await Message.create({ sender: info.id, receiver, text });
                res.status(200).json(message);
            });
        }
    }
    catch (e) {
        res.status(400).json({ msg: "something wrong" });
    }
});

router.get('/message/:userId', async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            res.status(400).json({ msg: "something wrong" });
        }
        else {
            jwt.verify(token, process.env.SECRET_KEY, {}, async (err, info) => {
                if (err) throw err;
                const messages = await Message.find({ $or: [{ sender: info.id, receiver: req.params.userId }, { sender: req.params.userId, receiver: info.id },], }).sort({ timestamp: 1 }).populate('sender', ['username']).populate('receiver', ['username']);
                res.json(messages);
            });
        }
    }
    catch (e) {
        res.status(400).json({ msg: "something wrong" });
    }
});

module.exports = router;
