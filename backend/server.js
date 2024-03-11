require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const userRoute = require('./routes/userRoute')
const postRoute = require('./routes/postRoute')




const port = process.env.PORT || 4001

connectDB();

const app = express()


app.use(cors());
app.use(express.json());



app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
});