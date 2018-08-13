//Initializing NG app
let taskApp = angular.module('taskApp', [] );

//Initializing controller
taskApp.controller('TaskController', function ($http) {
    console.log('TaskController is ready');
    const vm = this;
    vm.taskList = [];
    getTasks();

    vm.sortColumn = "";
    vm.reverseSort = true;

    vm.sortData = function (column) {
        console.log('in sortData', column);
        vm.reverseSort = (vm.sortColumn == column) ? !vm.reverseSort : true;
        vm.sortColumn = column;
    };

    vm.getSortClass = function (column) {
        console.log('in getSortClass', column);
        if (vm.sortColumn == column) {
            return vm.reverseSort ? 'sort-down' : 'sort-up'
        } return '';
    };

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
        let cT = confirm('Comfirming completion?');
        if (cT == true) {
            alert('Task completed!');
            $http({
                method: 'PUT',
                url: '/task/taskCompleted/' + taskId
            }).then(function (response) {
                getTasks();
            }).catch(function (error) {
                alert('error completing task')
                console.log('error completing', error);
            });
        } else {
            alert('Cancel completion.')
        };       
    }; //end of PUT

    vm.deleteTask = function (taskId) {
        console.log('in deleteTask');
        let dT = confirm('Confirming delete?');
        if (dT == true) {
            alert('Task deleted!');
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
        } else {
            alert('Cancel deletion.')
        };
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
            alert('error getting tasks', error);
            console.log('error in GET', error);
        });
    }; //end of GET
})