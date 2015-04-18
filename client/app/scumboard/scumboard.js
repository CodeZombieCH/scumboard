'use strict';

angular.module('scumboardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('scumboard', {
        url: '/scumboard',
        templateUrl: 'app/scumboard/scumboard.html',
        controller: 'ScumboardCtrl'
      });
  });