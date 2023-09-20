const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    createDate:{
        type: Date,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    roomId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Message', messageSchema);