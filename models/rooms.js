const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    createDate:{
        type: Date,
        required: true
    },
})

module.exports = mongoose.model('Room', roomSchema);