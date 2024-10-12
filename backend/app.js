const connectDB = require('./utils/db');
const express = require('express');
const session = require('express-session');
const authRoutes = require('./routes/auth').router;
const blogRoutes = require('./routes/blogRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET  || 'Aa18018071',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }
}));


app.use('/users', authRoutes);
app.use('/blogs', blogRoutes);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

