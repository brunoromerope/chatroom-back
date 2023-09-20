require("dotenv").config();
const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const cors = require ('cors');
const bodyParser = require('body-parser');
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000", // It's required if the front-end is running apart from the back-end
        methods: ["GET", "POST"]
    }
});

const port = process.env.PORT || 8089;


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));


// Routes
let useMessages = require('./routes/messages');
app.use('/api', useMessages(io));

// Connection to MongoDB database
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB')
})
.catch((err) => {
    console.log(err)
})

// Root path  
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Listening for new connections to socket io server
io.on('connection', (socket) => {
    console.log('User connected:', socket.id)

    socket.on('disconnect', (data) => {
        console.log('User disconnected:', data)
    })
});


// Run http server on port designed
http.listen(port, () => {
    console.log(`Running on port ${port}`)
})
