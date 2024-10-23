const express = require('express');
const router = express.Router();
const Comment = require('../Models/Comment');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
router.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
router.use(cookieParser());

router.post('/comment/add', async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            res.status(400).json({ msg: "something wrong" });
        }
        else {
            jwt.verify(token, 'asdfg4g34ui4n42il@nvirg8n23rh4j8932smnqehilnjkfl', {}, async (err, info) => {
                if (err) throw err;
                const { vlogId, text } = req.body;
                const comment = await Comment.create({ user: info.id, vlog: vlogId, text: text });
                const lastComment = await Comment.findOne({ vlog: vlogId }).sort({ _id: -1 }).populate('user', ['username']);
                res.json(lastComment);
            });
        }
    }
    catch (e) {
        res.status(400).json({ msg: "something wrong" });
    }
});

router.get('/comment/:vlogId', async (req, res) => {
    try {
        const comments = await Comment.find({ vlog: req.params.vlogId }).populate('user', ['username']);
        res.json(comments);
    } catch (err) {
        res.status(400).json({ msg: "something wrong" });
    }
});

module.exports = router;