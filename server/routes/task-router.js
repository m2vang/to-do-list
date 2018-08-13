//require
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    task: {type: String},
    note: {type: String},
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

router.delete('/taskDeleted/:id', (req, res) => {
    console.log('/taskDeleted DELETE hit');
    Task.findByIdAndRemove(req.params.id).then( (response) => {
        console.log('task deleted', response);  
        res.sendStatus(200);
    }).catch( (error) => {
        console.log('error in Delete', error);
        res.sendStatus(500);
    });
}); //end of DELETE

router.put('/taskCompleted/:id', (req, res) => {
    console.log('/taskCompleted PUT hit', req.params.id);
    Task.findOne({_id: req.params.id}).then( (foundTask) => {
        console.log('task completed', foundTask);
        foundTask.complete = true;
        foundTask.save().then( (response) => {
            console.log('task completed', foundTask);           
            res.sendStatus(200);
        }).catch( (error) => {
            console.log('error in completion', error);   
            res.sendStatus(500);
        });
    });
}); //end of PUT

module.exports = router;