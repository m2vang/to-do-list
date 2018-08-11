//Initializing NG app
let taskApp = angular.module('taskApp', [] );

//Initializing controller
taskApp.controller('TaskController', function () {
    console.log('TaskController is ready');
    const vm = this;
    vm.taskList = [];
})