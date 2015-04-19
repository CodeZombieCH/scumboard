'use strict';

angular.module('scumboardApp')
  .controller('ScumboardCtrl', function ($scope, $http, socket) {
    var baseUrl = '/api/tasks';

    $scope.tasks = [];

    $http.get(baseUrl).success(function(tasks) {
      $scope.tasks = tasks;
      socket.syncUpdates('task', $scope.tasks);
    });

    $scope.addTask = function() {
      if(!$scope.newTask) {
        return;
      }

      $scope.newTask.status = 'todo';

      $http.post(baseUrl, $scope.newTask);
      $scope.newTask = null;
    };

    $scope.updateTask = function(task) {
      if(!task) {
        return;
      }

      $http.put(baseUrl + '/' + task._id, task);
    };

    $scope.deleteTask = function(task) {
      $http.delete(baseUrl + '/' + task._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('task');
    });


    $scope.isMovable = function(task, direction) {
      if(direction === 'left')
        return task.status === 'inprogress' || task.status === 'done';
      else if (direction === 'right') {
        return task.status === 'todo' || task.status === 'inprogress';
      }
    };

    $scope.moveTask = function(task, direction) {
      if(direction === 'left') {
        if (task.status === 'inprogress')
          task.status = 'todo';
        else if (task.status === 'done')
          task.status = 'inprogress';
      }
      else if (direction === 'right') {
        if(task.status === 'todo')
          task.status = 'inprogress';
        else if(task.status === 'inprogress')
          task.status = 'done';
      }

      $scope.updateTask(task);
    };

    $scope.dragControlListeners = {
      accept: function (sourceItemHandleScope, destSortableScope) {
        return sourceItemHandleScope.itemScope.sortableScope.$id != destSortableScope.$id;
      },
      itemMoved: function (event) {
        event.source.itemScope.modelValue.status =
          event.dest.sortableScope.element.context.getAttribute('data-status');
        $scope.updateTask(event.source.itemScope.modelValue);
      },
      orderChanged: function(event) {

      }
    };
  });
