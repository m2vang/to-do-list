//require
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    task: {type: String},
    complete: {type: Boolean, default: false}
}); //end of TaskSchema

const Task = mongoose.model('Task', TaskSchema);

router.get('/', (req, res) => {
    console.log('/task GET hit');
    Task.find({}).then( (foundTasks) => {
        console.log('found tasks', foundTasks);
        res.send(foundTasks);
    }).catch( (error) => {
        console.log('error in GET', error);
        res.sendStatus(500);
    });
}); //end of GET

router.post('/', (req, res) => {
    console.log('/task POST ht', req.body);
    let taskFromClient = req.body;
    const taskToAdd = new Task(taskFromClient);
    taskToAdd.save().then( () => {
        console.log('task added', taskToAdd);
        res.sendStatus(200);
    }).catch( (error) => {
        console.log('error in POST', error);
        res.sendStatus(500);
    });
}); //end of POST

module.exports = router;