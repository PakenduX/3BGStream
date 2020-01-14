const mongoose = require("mongoose");

const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
const server = '127.0.0.1:27017';

const initDbConnection = () => {
    const db = mongoose.createConnection(`mongodb://${server}`, option);

    db.on("error", console.error.bind(console, "MongoDB Connection Error>> : "));
    db.once("open", () => {
        console.log("client MongoDB Connection ok!");
    });
    require('./PlayList')
    require('./Video')
    require('./User')
    return db;
};

const getUser = (conn) => {
    const db = conn.useDb('3BGStreamUser');
    return db.model('User');
};
const getVideo = (conn) => {
    const db = conn.useDb('3BGStreamVideo');
    return db.model('Video');
};

const getPlayList = (conn) => {
    const db = conn.useDb('3BGStreamVideo');
    return db.model('PlayList');
};

module.exports = {
    initDbConnection,
    getUser,
    getVideo,
    getPlayList
};