//Initializing NG app
let taskApp = angular.module('taskApp', [] );

//Initializing controller
taskApp.controller('TaskController', function ($http) {
    console.log('TaskController is ready');
    const vm = this;
    vm.taskList = [];
    getTasks();

    vm.sendTask = function () {
        console.log('in sendTask', vm.taskIn);

        let taskToSend = {
            task: vm.taskIn,
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
    }; //end of POST sendTask

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
    }; //end of GET getTasks
})