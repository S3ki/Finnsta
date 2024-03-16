const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const userRoute = require('./routes/userRoute')
const postRoute = require('./routes/postRoute')
const uploadRoutes = require('./routes/uploadRoute');
const path = require('path');
require("dotenv").config();


connectDB();

const app = express()


app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api', uploadRoutes);

app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);


module.exports = app;