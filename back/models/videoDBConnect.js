let mongoose = require('mongoose');
const server = '127.0.0.1:27017';
const database = '3BGStreamVideo';

/**
 * Playlist database creation
 */
class Database {

    getConnection() {
        mongoose.connect(`mongodb://${server}/${database}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(() => {
                console.log('video database connected successfully')
            })
            .catch((error) => {
                console.log(error)
            })
        return mongoose.connection
    }
}
module.exports = Database