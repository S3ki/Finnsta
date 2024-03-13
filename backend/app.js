const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const userRoute = require('./routes/userRoute')
const postRoute = require('./routes/postRoute')
require("dotenv").config();



connectDB();

const app = express()


app.use(cors());
app.use(express.json());



app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);


module.exports = app;