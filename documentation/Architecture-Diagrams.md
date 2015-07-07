
# Our Application Stack and the Tools we used : 

![Application Stack](https://cloud.githubusercontent.com/assets/8406690/8513068/e3b2a558-232a-11e5-9eda-83a49d6839f7.png)


Our solution is comprised of more than five modern, open-source technologies.  Our selection of technologies was driven by several factors including the language, frameworks, and libraries most appropriate to solve the problem, the ability for the technology to conform to modern development best practices, and tools that best support the full end-to-end life cycle of development for maximum quality.  These factors were considered for the technologies selected for front-end, back-end, and dev-ops.

**a.) Front-End:** Bootstrap, Angular.JS, Node.js, Karma, JS Hint, HighCharts

We decided on JavaScript for the front-end technology to ensure a highly decoupled front-end from back-end.

We selected high-charts due to the variety of available visualizations and moderate learing curve compared to other similar frameworks.

AngularJS was selected to build-out the front-end as a single-page application.
Node.JS was used to host the front-end code and manages the resolution of front-end dependencies thorugh NPM.
We selectd Bootstrap as the framework to support the responsive web design.
Karma / JS Hint provide static code analysis and code quality metrics for JavaScript applications.

**b.) Backend:** Ruby, Rails, RSpec, Rubocop, Brakeman

The original concept for the application was to incorporate Natural Language Processing (NLP) in order to identify the adverse-effects described in the labels.  For this concept we were considering the use of Python as it is best suited to implement NLP algorithms.  Due to the limited time for the challenge to implement an NLP solution, we pivoted our concept to leverage the power of the crowd to identify the adverse-effects on the labels.   We detemined the most appropriate language for these backend-API's was Ruby/Rails.  Rails provides many features such as scaffolding of controllers and views, built-in support for database migrations, and out-of-the-box input validation.  There is a large number of gems available to such as the Swagger gem to be able to automatically produce a swagger file as part of the build process.

To support unit testing, code quality, and code security we selected RSpec, Rubocop, and Brakeman respectively.

**c.) Dev-Ops:** Docker (Machine, Registry, Compose), Jenkins, cAdvisor

Our motivations for the Dev Ops stack was to leverage open source technologies that would enable rapid creation and deployment of containers.  We also feel that an important aspect to achieving the maximum developer experience (DX) is to provide end-to-end solutions to include the components of the dev ops stack as part of the open source solution.   Therefore we selected Jenkins and Docker solutions that could run on-premise or in-cloud as opposed to SaaS based solutions.  This will help to ensure the greatest probablity of adoption in the solution within the open source community.

The team selected Jenkins over other options for the following reasons:
- Speed - On-premise jenkins server runs very fast.  The team had experienced significant slowdowns with Travis.   Our build with Jenkins runs in less than a minute. 
- Flexibility – Jenkins is a complete open source solution for continuous integration and continuous deployment that can be run anywhere. Having full control over the testing, build, and deployment operations was important for us to remain open to different technologies we might leverage during the challenge. 
- Docker Integration - Jenkins allowed the construction of Docker images within the build server rather than having to leverage an external container build service. 

In the interest of meeting maximizing the value of our open source Dev-Ops stack, all of our build scripts were contributed to the repository:
https://github.com/booz-allen-agile-delivery/ads-final/tree/development/bin/jenkins



# Physical Deployment Model:

![Physical Deployment Model](https://cloud.githubusercontent.com/assets/8406690/8513155/a8c11102-232d-11e5-8cd5-9ea748f1e537.png)


# Dependent technology licenses:
| Technology  |  License    |
| ----------- |-------------|
| [NodeJS](https://github.com/joyent/node)  | [License](https://github.com/joyent/node/blob/master/LICENSE) |
| [Grunt](http://gruntjs.com/)  | [MIT](https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT )  |
| [AngularJS](https://angularjs.org/)  | [MIT](https://github.com/angular/angular.js/blob/master/LICENSE)  |
| [Karma](http://karma-runner.github.io/0.12/index.html) | [MIT](https://github.com/karma-runner/karma/blob/master/LICENSE)  |
| [Docker](https://www.docker.com/)  | [Apache](https://github.com/docker/docker/blob/master/LICENSE)  |
| [Docker-Machine](https://github.com/docker/machine)  | [Apache](https://github.com/docker/machine/blob/master/LICENSE) |
| [Docker-Compose](https://github.com/docker/compose)  | [Apache](https://github.com/docker/compose/blob/master/LICENSE) |
| [Docker-Registy](https://github.com/docker/distribution) | [Apache](https://github.com/docker/distribution/blob/master/LICENSE) |
| [Bootstrap](http://getbootstrap.com/) | [MIT](https://github.com/twbs/bootstrap/blob/master/LICENSE)  |
| [jshint](http://jshint.com/) | [MIT](https://github.com/jshint/jshint/blob/master/LICENSE) |
| [rails](https://github.com/rails/rails) | [MIT](http://opensource.org/licenses/MIT) |
| [rSepc](https://github.com/rspec/rspec) | [MIT](https://github.com/rspec/rspec/blob/master/License.txt) |
| [ruboCop](https://github.com/bbatsov/rubocop) | [License](https://github.com/bbatsov/rubocop/blob/master/LICENSE.txt) |
| [brakeman](https://github.com/presidentbeef/brakeman) | [MIT](https://github.com/presidentbeef/brakeman/blob/master/MIT-LICENSE) |
| [cAdvisor](https://github.com/google/cadvisor) | [Apache](https://github.com/google/cadvisor/blob/master/LICENSE) 
| [Jenkins](https://jenkins-ci.org/)  | [MIT](https://github.com/jenkinsci/jenkins/blob/master/LICENSE.txt) |
