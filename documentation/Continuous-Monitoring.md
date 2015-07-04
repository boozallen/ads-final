# Monitoring

To ensure system reliability and normal operating procedure we implemented a continuous monitoring solution to keep us aware of the state of our public facing systems. 

![devops](https://cloud.githubusercontent.com/assets/1631162/8363339/38036994-1b4c-11e5-86a1-4fad3f968bfe.png)

### [cAdvisor](https://github.com/google/cadvisor)

The cAdvisor tool allows us to seamlessly review and analyze our EC2 instance machine performance, as well as dive into the container specific metrics. The information is presented in a simple but efficient html format that can be accessed anytime and anywhere. Insights or warning can be discovered through useful graphs and metrics on memory usage, cpu usage, throughput, and processes. Container specific metrics are valuable to review anomalies in the exact service, reducing debugging time, and allowing for service specific optimizations. 

### [slack](https://slack.com/)

We used slack integrations to keep a consistent eye on any activity with Github and Jenkins. GitHub pushes and pull requests could be immediately observed in the slack app. Also, using a Jenkins plugin we were able to get immediate notifications on any deployments being orchestrated by the Jenkins CI. This monitoring kept the team in synch with what was being released to the different environments and if there were any build, test, or deployment failures. 