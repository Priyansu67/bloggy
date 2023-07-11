//MongoDB Connection
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI, {
    dbName: 'witartist',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

module.exports = db;