const express = require('express');
const router = express.Router();
const Story = require('../Models/Story');
const multer = require('multer');//use for storing images
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
router.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
router.use(cookieParser());

const storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            return cb(null, "../frontend/Images");
        },
        filename: function (req, file, cb) {
            return cb(null, `${Date.now()}_${file.originalname}`)
        }
    }
)
const upload = multer({ storage });

router.post('/stories', upload.array('images'), async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            res.status(400).json({ msg: "something wrong" });
        }
        else {
            jwt.verify(token, process.env.SECRET_KEY, {}, async (err, info) => {
                if (err) throw err;
                let obj = req.files;
                let images = [];
                for (let i = 0; i < obj.length; i++) {
                    images.push(obj[i]['filename']);
                }
                const story = await Story.create({ user: info.id, caption: req.body.caption, images: images });
                res.status(200).json(story);
            });
        }
    }
    catch (e) {
        res.status(400).json({ msg: "something wrong" });
    }

});

router.get('/stories', async (req, res) => {
    const stories = await Story.find({ createdAt: { $gte: Date.now() - 24 * 60 * 60 * 1000 } }).populate('user', 'username');
    res.json(stories);

});

module.exports = router;
