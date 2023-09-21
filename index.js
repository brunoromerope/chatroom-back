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

// List of connected users
var connectedUsers = {}


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

// Valid available username
app.post('/username', (req, res) => {
    res.json({status: Object.values(connectedUsers).includes(req.body.username)});
})

// Root path  
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Listening for new connections to socket io server

io.on('connection', (socket) => {
    console.log('User connected:', socket.id)

    //Get connected users if server rebooted
    io.emit('getUsers');
    
    //Listen for username of new clients and added to the list
    socket.on('setUsername', (username) => {
        connectedUsers[socket.id] = username
        io.emit('userList', Object.values(connectedUsers))
    })

    //If a client was disconnected remove it from the list 
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id)
        
        const disconnectedUser = connectedUsers[socket.id]
        delete connectedUsers[socket.id]

        io.emit('userList', Object.values(connectedUsers));
    })
});

//Listen for username of new clients and added to the list
io.on('setUsername', (username) => {
    connectedUsers[socket.id] = username
    io.emit('userList', Object.values(connectedUsers))
})


// Run http server on port designed
http.listen(port, () => {
    console.log(`Running on port ${port}`)
})
