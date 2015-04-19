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
        _id: 1,
        name: 'Perform roundhouse kick',
        description: '...',
        status: 'todo',
        cost: 1,
        owner: 'Chuck Norris'
      }, {
        _id: 2,
        name: 'Defeat Chuck Norris',
        description: 'Defeat Chuck Norris in epic battle',
        status: 'inprogress',
        cost: 3,
        owner: 'Bruce Lee'
      }, {
        _id: 3,
        name: 'Beat up Dolph Lundgren',
        description: 'Challenge mother russia by beating up Dolph Lundgren',
        status: 'done',
        cost: 8,
        owner: 'Sylvester Stallone'
      }]);

    scope = $rootScope.$new();
    ScumboardCtrl = $controller('ScumboardCtrl', {
      $scope: scope
    });
  }));

  // Verify expectations
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should attach a list of tasks to the scope', function () {
    $httpBackend.flush();
    expect(scope.tasks.length).toBe(3);
  });

  it('should send a POST request to the API when adding a new task', function() {

    // Expecting a POST request with the new task
    $httpBackend.expectPOST('/api/tasks', {
      name: 'Defeat Chuck Norris',
      description: 'Defeat Chuck Norris in epic battle',
      status: 'todo',
      cost: 3,
      owner: 'Bruce Lee'
    }).respond(201, '');

    // Perform test operation
    scope.newTask = {
      name: 'Defeat Chuck Norris',
      description: 'Defeat Chuck Norris in epic battle',
      cost: 3,
      owner: 'Bruce Lee'
    };

    scope.addTask();

    // Trigger HTTP requests
    $httpBackend.flush();
  });

  it('should send a PUT request to the API when updating a task', function() {
    $httpBackend.flush();

    // Expecting a POST request with the new task
    $httpBackend.expectPUT('/api/tasks/2', {
      _id: 2,
      name: 'Defeat Chuck Norris',
      description: 'Defeat Chuck Norris in epic battle',
      status: 'inprogress',
      cost: 3,
      owner: 'Bruce Lee'
    }).respond(200, '');

    // Perform test operation
    var taskToUpdate = scope.tasks[1];
    taskToUpdate.status = 'inprogress';

    scope.updateTask(taskToUpdate);

    // Trigger HTTP requests
    $httpBackend.flush();

    expect(scope.tasks[1].status).toEqual('inprogress');
  });

  it('should send a DELETE request to the API when deleting a task', function() {
    $httpBackend.flush();
    var taskToDelete = scope.tasks[2];

    // Expecting a DELETE request
    $httpBackend.expectDELETE('/api/tasks/' + taskToDelete._id).respond(200, '');

    // Perform test operation
    scope.deleteTask(taskToDelete);

    // Trigger HTTP requests
    $httpBackend.flush();

    //expect(scope.tasks.length).toBe(2);
  });
});
