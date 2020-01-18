let mongoose = require('mongoose');

let Video = mongoose.model('Video', {
    videoId: {
        type: String,
        required: true,
        unique: true
    },
    storage_url: {
        type: String,
    },
    playListId : {
        type: mongoose.ObjectId,
        required: true
    },
    userId : {
        type: mongoose.ObjectId,
        required: true
    },
    title : {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

});

module.exports = Video;