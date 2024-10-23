const express = require('express')
const router = express.Router();
const Card = require('../Models/Card');
const User = require('../Models/User');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
router.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
router.use(cookieParser());
const dotenv = require('dotenv');
dotenv.config();

router.get('/allcards', async (req, res) => {
    try {
        let allCards = await Card.find({});
        res.status(200).json(allCards);
    }
    catch (e) {
        res.status(400).json({ msg: 'something galat' })
    }
})

router.post('/:cardId/addCard', async (req, res) => {
    try {
        let { cardId } = req.params;
        const { token } = req.cookies;
        jwt.verify(token, process.env.SECRET_KEY, {}, async (err, info) => {
            if (err) throw err;
            let userId = info.id;
            let card = await Card.findById(cardId);
            let user = await User.findById(userId);
            user.cart.push(card);
            await user.save();
            res.status(200).json({ success_msg: 'Added to future plans' });

        });
    }
    catch (e) {
        res.status(400).json({ msg: 'something galat' })
    }

})

router.get('/cards', async (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        res.status(400).json({ msg: 'something wrong' })
    }
    else {
        jwt.verify(token, process.env.SECRET_KEY, {}, async (err, info) => {
            if (err) throw err;
            let userId = info.id;
            let user = await User.findById(userId).populate('cart');
            res.status(200).json(user);
        });
    }

})



module.exports = router;