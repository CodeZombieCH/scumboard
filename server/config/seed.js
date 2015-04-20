/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});


var Task = require('../api/task/task.model');

Task.find({}).remove(function() {
  Task.create({
    name: 'Perform roundhouse kick',
    description: 'Perform roundhouse kick!',
    status: 'todo',
    cost: 1,
    owner: 'Chuck Norris'
  }, {
    name: 'Solve that case',
    description: 'Find out who murdered the victim in front of you while smoking a cigar',
    status: 'todo',
    cost: 3,
    owner: 'Inspector Columbo'
  }, {
    name: 'Fight criminals',
    description: 'Fight evil criminals as Walker, Texas Ranger',
    status: 'inprogress',
    cost: 2,
    owner: 'Chuck Norris'
  }, {
    name: 'Defeat Chuck Norris',
    description: 'Defeat Chuck Norris in epic battle',
    status: 'inprogress',
    cost: 5,
    owner: 'Bruce Lee'
  }, {
    name: 'Beat up Dolph Lundgren',
    description: 'Challenge mother russia by beating up Dolph Lundgren',
    status: 'done',
    cost: 8,
    owner: 'Sylvester Stallone'
  }, {
    name: 'Become famous',
    description: 'Become a superstar by making funny movies',
    status: 'done',
    cost: 5,
    owner: 'Jackie Chan'
  });
});
