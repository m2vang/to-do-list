//Initializing NG app
let taskApp = angular.module('taskApp', [] );

//Initializing controller
taskApp.controller('TaskController', function ($http) {
    console.log('TaskController is ready');
    const vm = this;
    vm.taskList = [];
    getTasks();

    vm.sendTask = function () {
        console.log('in sendTask', vm.taskIn, vm.noteIn);

        let taskToSend = {
            task: vm.taskIn,
            note: vm.noteIn,
            complete: vm.doneIn
        };

        $http({
            method: 'POST',
            url: '/task',
            data: taskToSend
        }).then(function (response) {
            console.log('task posted', response.data);
            getTasks();
        }).catch(function (error) {
            alert('unable to post task');
            console.log('error in POST', error);           
        });

        vm.taskIn = '';
        vm.noteIn = '';
    }; //end of POST

    vm.completeTask = function(taskId) {
        console.log('in completeTask', taskId);    
        $http({
            method: 'PUT',
            url: '/task/taskCompleted/' + taskId
        }).then(function (response) {
            getTasks();
        }).catch(function (error) {
            alert('error completing task')
            console.log('error completing', error);          
        });
    }; //end of PUT

    vm.deleteTask = function (taskId) {
        console.log('in deleteTask');
        $http({
            method: 'DELETE',
            url: '/task/taskDeleted/' + taskId
        }).then(function (response) {
            console.log('task deleted');
            getTasks();
        }).catch(function (error) {
            alert('error in deleting')
            console.log('error deleting', error);
        });
    }; //end of DELETE 

    function getTasks() {
        console.log('in getTasks');
        $http({
            method: 'GET',
            url: '/task'
        }).then(function (response) {
            console.log('found task', response.data);
            vm.taskList = response.data;
        }).catch(function (error) {
            alert('error getting tasks');
            console.log('error in GET', error);
        });
    }; //end of GET
})