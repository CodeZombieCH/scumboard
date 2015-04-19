# Scumboard

**Scumboard** is a very basic implementation of a Scurm board based on the MEAN (MongoDB, Express, AngularJS, and Node.js) stack. It is mainly written in JavaScript.

This project aims to build a solid knowledge of how to build web apps in a very short time using bleeding edge tools and frameworks provided by the open source community.


## Assignment

See ASIGNMENT.md file


## Why Yeoman/AngularJS?

*Draft: use technologies that might be useful for my current employer, very short time to market, focus on building knowledge and writing a documentation that might be helpful to others*


## Prerequieres

- node
- npm
- docker

`docker` is not required by yeoman or any other framework used in this project. It is required because it's my personal preference in order to keep the number of dependencies as small as possible. The use of docker allows me to install individual project components as docker containers, offering the ability have multiple instances and versions installed without messing up my development machine.


## Preparation

Prepare a running MongoDB server using docker:

	docker run --name mongodb -d -p 27017:27017 mongo

We expose the containers mongodb on the local port 27017 (default port) so connection to the mongodb container is as simple as connection to `localhost`.


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


## Tasks

- ☑ Basic scrumboard with the columns
- ☑ Add new task
- ☑ Edit existing task (in-place editor)
- ☑ Delete task
- ☑ Move task
- ☐ In-line editor allowing cancellation
http://stackoverflow.com/questions/16838148/is-there-a-pattern-for-dealing-with-cancel-in-angularjs-modal-dialogs
- ☐ Improve overall visual appearance


## Resources

- https://github.com/DaftMonk/generator-angular-fullstack
- https://github.com/a5hik/ng-sortable/
- http://www.html5rocks.com/en/tutorials/dnd/basics/
- https://scotch.io/tutorials/angularjs-form-validation


## License

See LICENSE file


## Author

CodeZombie
