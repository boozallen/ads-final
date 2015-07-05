#Automated Testing

In order to maintain healthy code among the team, any team shared code was subjected to rigorous automated tests on various perspectives of quality, including code, security, performance, and functionality. Tests were executed automatically as developers submitted code to the repository. Feedback was made available to developers within minutes of the submission on a variety of criteria explained below. If all tests were successful a deployment was automatically initiated and available for review on the appropriate environment.

![automated_testing_v2](https://cloud.githubusercontent.com/assets/12210910/8501116/7a70d5da-2170-11e5-96fc-ba16d2261bcb.png)


For more information on how the tests were executed in the build process please refer to the [api](https://github.com/booz-allen-agile-delivery/ads-final/blob/development/bin/jenkins/api-test.sh) and [front end](https://github.com/booz-allen-agile-delivery/ads-final/blob/development/bin/jenkins/api-test.sh) shell scripts. 

For more information on how builds were created and deployed please refer to the [api](https://github.com/booz-allen-agile-delivery/ads-final/blob/development/bin/jenkins/api-build.sh) and [front end](https://github.com/booz-allen-agile-delivery/ads-final/blob/development/bin/jenkins/fe-build.sh) shell scripts.

### Create unit and integration tests to verify modules and components
***
- [rSpec](https://github.com/rspec)-
ruby unit and integration testing, check out our [api tests](https://github.com/booz-allen-agile-delivery/ads-final/tree/development/api/spec). 

These tests were used to validate business logic in the backend that was serving up useful information to our front end through a RESTful interface. Integration is accomplished through associating a database service with rails and executing only transactional events. Test execution is done using the `rspec` command.

### Create automated tests that verify all user-facing functionality
***
- [karma](https://github.com/karma-runner/karma)-
javascript functional tests, checkout out our [front end tests](https://github.com/booz-allen-agile-delivery/ads-final/tree/development/www/test/spec/controllers)

These tests validate the user facing functionality of the site. PhantomJS is used to execute the tests in a headless browser environment to increase speed. Jasmine is also used to provide a full featured testing harness and clean readability. Execution is orchestrated through a Grunt task.

### Conduct load and performance tests at regular intervals, including before public launch
***
- [bees with machineguns](https://github.com/newsapps/beeswithmachineguns)-
distributed AWS load testing, run by one-click [Jenkins job](https://jenkins.labelcraft.io/view/Development/job/Run%20Bees%20With%20Machineguns%20Load%20Test/) on an ad-hoc basis by the developers discretion. This tool helps provision ec2 instances with agents that will generate load on identified endpoints.

- [grunt-devperf](https://github.com/gmetais/grunt-devperf)-
Grunt task that uses phantomjs to launch areas of the site and review a variety of performance metrics that can be compared to budgeted performance goals. Warnings and other alerts will be presented to help identify areas of performance improvement. [example report from Jenkins](http://52.0.92.86:8080/view/Development/job/Development_FrontEnd_Builder/lastSuccessfulBuild/artifact/reports/tests/tests/results/index.html)


### Execute static analysis and security scans
***
- [brakeman](https://github.com/presidentbeef/brakeman)-
static code analysis focusing on security threats for ruby source code, run after push to develop and release

- [rubocop](https://github.com/bbatsov/rubocop)-
static code quality analysis for ruby source code, run after push to develop and release



