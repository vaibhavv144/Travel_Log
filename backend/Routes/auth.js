const express = require('express')
const router = express.Router();
const User = require('../Models/User');
const Vlog = require('../Models/Vlog');
const Comment = require('../Models/Comment');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
router.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
router.use(cookieParser());
const dotenv = require('dotenv');
dotenv.config();
router.post('/register', async (req, res) => {
    try {
        let { email, password, username } = req.body;

        const user = await User.create({
            email,
            username,
            password: bcrypt.hashSync(password, salt),
        });
        res.status(200).json({ success_msg: 'Registered successfully' });
    }
    catch (err) {
        res.status(400).json({ error_msg: 'Registration failed' });
    }

})


router.post('/login', async (req, res) => {
    let { password, username } = req.body;
    try {
        const user = await User.findOne({ username });
        const passed = bcrypt.compareSync(password, user.password);
        if (passed) {
            jwt.sign({ username, id: user._id }, process.env.SECRET_KEY, { expiresIn: "7d" }, (err, token) => {
                if (err) throw err;
                res.cookie('token', token, { maxAge: 7 * 24 * 60 * 60 * 1000,sameSite:'None',secure:true }).json({
                    id: user._id,
                    username,
                });//save in cookies make cookie 
            })
        }
        else {
            res.status(400).json('wrong credentials');
        }
    }
    catch (e) {
        res.status(400).json('wrong credentials');
    }
})

router.get('/profile', (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token)
            res.status(400).json({ msg: "nhi hai" });
        else {
            jwt.verify(token, process.env.SECRET_KEY, {  }, (err, info) => {
                if (err) throw err;
                res.json(info);
            });
        }
    }
    catch (e)
    {
        res.status(400).json({ msg: "something wrong" });
    }
})

router.get('/user/:userId', (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            res.status(400).json({ msg: "something wrong" });
        }
        else {
            jwt.verify(token, process.env.SECRET_KEY, {}, async (err, info) => {
                if (err) throw err;
                const user = await User.findById(req.params.userId).select('-password');
                const vlogs = await Vlog.find({ author: req.params.userId });
                const comments = await Comment.find({ user: req.params.userId }).populate('vlog', ['name']);
                if (!user) {
                    return res.status(404).json({ msg: 'User not found' });
                }
                res.json({user,vlogs,comments});
            });
        }
    }
    catch (e) {
        res.status(400).json({ msg: "something wrong" });
    }
})



router.post('/logout', (req, res) => {
    res.cookie('token', '', { sameSite: 'None', secure: true }).json('ok');
    
});//token empty cookie empty
module.exports = router;

