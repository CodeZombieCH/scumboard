'use strict';

describe('Controller: ScumboardCtrl', function () {

  // load the controller's module
  beforeEach(module('scumboardApp'));
  beforeEach(module('socketMock'));

  var
    ScumboardCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/tasks')
      .respond([{
        name: 'Perform roundhouse kick',
        description: '...',
        status: 'todo',
        cost: 1,
        owner: 'Chuck Norris'
      }, {
        name: 'Defeat Chuck Norris',
        description: 'Defeat Chuck Norris in epic battle',
        status: 'inprogress',
        cost: 3,
        owner: 'Bruce Lee'
      }]);

    scope = $rootScope.$new();
    ScumboardCtrl = $controller('ScumboardCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of tasks to the scope', function () {
    $httpBackend.flush();
    expect(scope.tasks.length).toBe(2);
  });
});
