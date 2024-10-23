const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const Trip = require('../Models/Trip');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
router.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
router.use(cookieParser());

router.post('/trips', async (req, res) => {
    
    try {
        const { token } = req.cookies;
        if (!token) {
            res.status(400).json({ msg: "something wrong" });
        }
        else {
            jwt.verify(token, process.env.SECRET_KEY, {}, async (err, info) => {
                if (err) throw err;
                const { destination, startDate, endDate } = req.body;
                const trip = await Trip.create({user: info.id,destination,startDate,endDate});
                res.status(201).json(trip);
            });
        }
    }
    catch (e) {
        res.status(400).json({ msg: "something wrong" });
    }
});

router.get('/travelbuddies', async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            res.status(400).json({ msg: "something wrong" });
        }
        else {
            jwt.verify(token, process.env.SECRET_KEY, {}, async (err, info) => {
                if (err) throw err;
                const { destination, startDate, endDate } = req.query;
                const matches = await Trip.find({destination,startDate: { $lte: new Date(endDate) },endDate: { $gte: new Date(startDate) },user: { $ne: info.id }
                }).populate('user', 'username email');
                res.json(matches);
            });
        }
    }
    catch (e) {
        res.status(400).json({ msg: "something wrong" });
    }

});

module.exports = router;
