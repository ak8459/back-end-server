const express = require('express');
const { connection } = require('./database/db');
const { userRouter } = require('./routes/user.route');
require('dotenv').config()
const cors = require('cors');
const { noteRouter } = require('./routes/notes.route')
let port = process.env.PORT;
const app = express();
app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World")
})
app.get('/about', (req, res) => {
    res.send("About Page")
})
app.get('/contact', (req, res) => {
    res.send("Contact Page")
})
app.get('/signin', (req, res) => {
    res.send("Signin Page")
})
// app.use('/user', userRouter);
// app.use('/notes', noteRouter);

app.listen(port, async () => {
    try {
        await connection
        console.log(`Server is running on port ${port}`);
    } catch (error) {
        console.log(error);
    }
})