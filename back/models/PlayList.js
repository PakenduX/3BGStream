let mongoose = require('mongoose');

let PlayList = mongoose.model('PlayList', {
    nom: {
        type: String,
        required: true
    },
    userId : {
        type: mongoose.ObjectId,
        required: true
    },
    date: Date

});

module.exports = PlayList;