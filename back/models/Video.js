let mongoose = require('mongoose');

let Video = mongoose.model('Video', {
    buffer_url: {
        type: String,
        required: true
    },
    storage_url: {
        type: String,
        required: true
    },
    playListId : {
        type: mongoose.ObjectId,
        required: true
    }

});

module.exports = Video;