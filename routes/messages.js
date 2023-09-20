const express = require('express');
const router = express.Router();
const messageSchema = require('../models/messages');
const roomSchema = require('../models/rooms');

module.exports = (io) => {

    //create message
    router.post('/message', (req, res) => {

        const newMessage = messageSchema(req.body);
        
        newMessage
        .save()
        .then((data) =>{
            res.json({status: true});
            io.emit('message', data)
        })
        .catch((error) => res.json({status: false, message: error}))
        
    });

    // get messages by room id
    router.get('/messages/:roomId', (req, res) => {
        
        messageSchema
        .find({roomId: req.params.roomId})
        .then((data) => res.json({status: true, data: data}))
        .catch((error) => res.json({status: false, message: error}))

    });

    //valid if the room exists otherwise create it
    router.post('/room', (req, res) => {

        roomSchema.find({name: req.body.name})
        .then((data) => {
            if (data.length == 0) {
                const newRoom = roomSchema(req.body);

                newRoom
                .save()
                .then((data) =>{
                    res.json({status: true});
                    io.emit('room', data)
                })
                .catch((error) => res.json({status: false, message: error}))
            }else {

                res.json({status: true});
            }
        })
        .catch((error) => res.json({status: false, message: error}))

        
        
        
    });

    // get rooms
    router.get('/rooms', (req, res) => {
        
        roomSchema
        .find()
        .then((data) => res.json({status: true, data: data}))
        .catch((error) => res.json({status: false, message: error}))

    });

    return router;
}