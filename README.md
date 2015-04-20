# Scumboard

**Scumboard** is a very basic implementation of a Scurm board based on the MEAN (MongoDB, Express, AngularJS, and Node.js) stack. It is mainly written in JavaScript.

This project aims to build a solid knowledge of how to build web apps in a very short time using bleeding edge tools and frameworks provided by the open source community.


## Assignment

See ASIGNMENT.md file


## Why Yeoman/AngularJS?

The reason I'm using AngularJS instead of Underscore was the idea to use tools/frameworks that allow me to build new web apps in a very short time, resulting in a smaller time to market.
Another focus was on gaining experience with some of the bleeding edge tools and writing a documentation that might be helpful to others while eventually finding new technologies that might be useful for future projects at my current employer.


### AngularJS MVC implementation

#### Model
No explicit definition of the model. Based on the JSON transfered by REST API. Loosely defined in the view by the `ng-model` directive.

#### View
Defined as part of HTML files using ordinary HTML markup combined with `ng-*` directives and `{{foo.bar}}` placeholders.

### Controller
Implemented as Angular controller:

```javascript
angular.module('app').controller('FooCtrl', function(){
	...
});
```

Exposes methods to be called from the view triggered by user interaction. Persists model by calling the REST API accordingly.


## Tasks

[x] Basic scrumboard with the columns
[x] Add new task
[x] Edit existing task (in-place editor)
[x] Delete task
[x] Move task
([x]) Deploy to heroku
[x] Deploy to heroku
[ ] Deploy to private dokku server
[ ] In-line editor allowing cancellation
http://stackoverflow.com/questions/16838148/is-there-a-pattern-for-dealing-with-cancel-in-angularjs-modal-dialogs
[ ] Improve overall visual appearance


## Prerequieres

- node
- npm
- docker

`docker` is not required by yeoman or any other framework used in this project. It is required because it's my personal preference in order to keep the number of dependencies as small as possible. The use of docker allows me to install individual project components as docker containers, offering the ability have multiple instances and versions installed without messing up my development machine.


## Preparation

Prepare a running MongoDB server using docker:

	docker run --name mongodb -d -p 27017:27017 mongo

We expose the containers mongodb on the local port 27017 (default port) so connecting to the mongodb container is as simple as connecting to locally installed mongodb on `localhost`.


## Installation

Install yeoman and dependecies

- bower
- grunt-cli (grunt)
- yo (yeoman)

This can easily be done using npm:

	npm install -g yo bower grunt-cli

Install generator of your choice. This particular projects uses [`generator-angular-fullstack`](https://github.com/DaftMonk/generator-angular-fullstack). This is again done using npm:

	npm install -g generator-angular-fullstack


## Scaffolding

### Base project

Start by building the base project

	yo angular-fullstack

Yeoman now asks for various options. After making your choices, it starts scaffolding the new web application and runs `bower install & npm install`.


### First endpoint

Scaffold endpoint

	yo angular-fullstack:endpoint task

Server side code for the new endpoint is created:

+ server/api/task/index.js
+ server/api/task/task.controller.js
+ server/api/task/task.model.js
+ server/api/task/task.socket.js
+ server/api/task/task.spec.js

Routes were updated accordingly:

- server/config/socketio.js
- server/routes.js


### First route

Scaffold Angular route

	yo angular-fullstack:route scrumboard

+ client/app/scumboard/scumboard.js
+ client/app/scumboard/scumboard.controller.js
+ client/app/scumboard/scumboard.controller.spec.js
+ client/app/scumboard/scumboard.jade
+ client/app/scumboard/scumboard.less


## Implementation

### In-place editor

Use the `ng-hide` and `ng-show` directives together with a property, e.g. `editing` to renders section for both states.


### HTML5 Drag & Drop
To allow the tasks to be dragged and dropped between the columns we use the new [Drag and Drop API](https://html.spec.whatwg.org/multipage/interaction.html#dnd) that is part of the HTML5 specification.

The fact that we are using AngularJS to create the actual DOM elements makes things a little bit more complicated. A nice solution is to search for a AngularJS module that provides a way to support Drag and Drop interactions. Searching the web revealed  [`ng-sortable`](https://github.com/a5hik/ng-sortable/) which is used in this project.


## Deployment

### Deploy to heroku

Use yeoman to scaffold a heroku app:

	yo angular-fullstack:heroku

As we are using mongodb, add an addon that provides a mongodb. Instead of the `mongohq` addon mentioned in the documentation we use `mongolab` as it provides a free plan.

Change into the `dist/` directory and add the addon (you might be advised to enter your credit card information using the heroku website):

	heroku addons:add mongolab:sandbox

After the mongodb has been set up run

	grunt build

to build the app to the `dist/` directory

Now we are able to deploy the app using

	grunt buildcontrol:heroku


## Resources

- https://github.com/DaftMonk/generator-angular-fullstack
- https://github.com/a5hik/ng-sortable/
- http://www.html5rocks.com/en/tutorials/dnd/basics/
- https://scotch.io/tutorials/angularjs-form-validation


## License

See LICENSE file


## Author

CodeZombie
