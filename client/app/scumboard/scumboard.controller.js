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
  });
