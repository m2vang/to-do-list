//mongoose require
const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tasksToDo';

//attempt to connect to mongo
mongoose.connect(mongoURI, { useNewUrlParser: true });
mongoose.connection.on('open', () => {
    console.log('connected to Mongo');
});
mongoose.connection.on('error', () => {
    console.log('error connecting to Mongo');
});

module.exports = mongoose;