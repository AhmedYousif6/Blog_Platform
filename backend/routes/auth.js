const User = require('../models/User');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
        return res.status(400).send('All fields are required');
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, username, password: hashedPassword });
        await user.save();
        //req.session.userId = user._id;
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if(err.code === 11000) {
            return res.status(400).send('Email or Username already exists');
        }
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Email and Password are required');
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Invalid email or password');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid email or password');
        }
        req.session.userId = user._id;
        res.status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('./logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.status(200).json({ message: 'Logged out successfully' });
    });
});

const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next();
    }
    return res.status(401).json({ message: 'Please log in to continue' });
};


module.exports = { router, isAuthenticated };
