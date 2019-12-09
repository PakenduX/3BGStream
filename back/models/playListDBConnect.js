let mongoose = require('mongoose');
const server = '127.0.0.1:27017';
const database = '3BGStreamPlayList';

/**
 * Playlist database creation
 */
class Database {

    getConnection() {
        mongoose.connect(`mongodb://${server}/${database}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        return mongoose.connection
    }
}
module.exports = Database