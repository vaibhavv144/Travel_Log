const express = require('express');
const router = express.Router();
const Expense = require('../Models/Expense');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { startOfDay, subDays, subWeeks, startOfMonth, endOfDay } = require('date-fns');
const dotenv = require('dotenv');
dotenv.config();
router.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
router.use(cookieParser());

router.post('/expense', async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            res.status(400).json({ msg: "something wrong" });
        }
        else {
            jwt.verify(token, process.env.SECRET_KEY, {}, async (err, info) => {
                if (err) throw err;
                const { description, amount } = req.body;
                const expense = await Expense.create({ user: info.id, description, amount });
                res.json(expense);
            });
        }
    }
    catch (e) {
        res.status(400).json({ msg: "something wrong" });
    }
});

router.get('/expense', async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            res.status(400).json({ msg: "something wrong" });
        }
        else {
            jwt.verify(token, process.env.SECRET_KEY, {}, async (err, info) => {
                if (err) throw err;
                const expenses = await Expense.find({ user: info.id });
                res.json(expenses);
            });
        }
    }
    catch (e) {
        res.status(400).json({ msg: "something wrong" });
    }

});

router.get('/summary', async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            res.status(400).json({ msg: "something wrong" });
        }
        else {
            jwt.verify(token, process.env.SECRET_KEY, {}, async (err, info) => {
                if (err) throw err;
                const userId = info.id;
                const yesterday = startOfDay(subDays(new Date(), 1));
                const endOfYesterday = endOfDay(subDays(new Date(), 1));
                const lastWeek = startOfDay(subWeeks(new Date(), 1));
                const startOfCurrentMonth = startOfMonth(new Date());

                const yesterdayExpenses = await Expense.find({
                    user: userId,
                    date: { $gte: yesterday, $lte: endOfYesterday }
                });
                const totalyer = yesterdayExpenses.reduce((sum, expense) => sum + expense.amount, 0);

                const lastWeekExpenses = await Expense.find({
                    user: userId,
                    date: { $gte: lastWeek, $lte: endOfDay(new Date()) }
                });
                const totalweek = lastWeekExpenses.reduce((sum, expense) => sum + expense.amount, 0);

                const moexpenses = await Expense.find({
                    user: userId,
                    date: { $gte: startOfCurrentMonth, $lte: endOfDay(new Date()) }
                });
                const totalmonth = moexpenses.reduce((sum, expense) => sum + expense.amount, 0);

                res.json({
                    yesterday: totalyer || 0,
                    lastWeek: totalweek || 0,
                    month: totalmonth || 0,
                });
            });
        }
    }
    catch (e) {
        res.status(400).json({ msg: "something wrong" });
    }

});

module.exports = router;