//Initializing NG app
let taskApp = angular.module('taskApp', [] );

//Initializing controller
taskApp.controller('TaskController', function ($http) {
    console.log('TaskController is ready');
    const vm = this;
    vm.taskList = [];
    getTasks();

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
            console.log('error in getTasks', error);
        });
    }; //end of getTasks
})