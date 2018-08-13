//require
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const taskRouter = require('./routes/task-router');
const PORT = process.env.PORT || 5000;
const mongoose = require('./public/modules/database.connection')

//uses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));
app.use('/task', taskRouter);

//PORT listen
app.listen(PORT, () => {
    console.log('server running on port:', PORT);
}); //end of app.listen