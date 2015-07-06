This page includes the practices used on the prototype:

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119.

GitHub:
* The team MUST follow GitFlow Branchinghttps://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
* Developers SHOULD NOT commit directly to master branch
* Developers SHOULD initiate pull requests to master

General Development:
* Developers MUST develop unit tests for code
* Developers MUST run tests before committing

Front-End:
* Developers SHOULD review the Angular Style Guide:https://github.com/johnpapa/angular-styleguide
* Developers MUST write unit tests for angular code using Karma
* Developers MUST fix JS HINT before committing code

Continuous Integration:
* Failed Builds MUST NOT be allowed to be deployed

Continuous Monitoring:
* Metrics MUST allow understanding of current system performance (i.e. CPU, Memory, Storage Space)
* Alerts MUST be triggered upon the following security related events: Failed Login Attempts, etc.

Manual Testing:
* Defects found SHOULD be reported as issues in GitHub

