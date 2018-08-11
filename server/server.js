//require
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const taskRouter = require('./routes/task-router');
const PORT = process.env.PORT || 5000;

//mongoose require
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/tasksToDo';

//attempt to connect to mongo
mongoose.connect(mongoURI, {useNewUrlParser: true});
mongoose.connection.on('open', () => {
    console.log('connected to Mongo');
});
mongoose.connection.on('error', () => {
    console.log('error connecting to Mongo');
});

//uses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));
app.use('/task', taskRouter);

//PORT listen
app.listen(PORT, () => {
    console.log('server running on port:', PORT);
}); //end of app.listen