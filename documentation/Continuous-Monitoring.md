# Monitoring

To ensure system reliability, security, and normal operating procedure we implemented a continuous monitoring solution. 

### [cAdvisor](https://github.com/google/cadvisor)

See a live feed of our production cAdvisor monitoring -- https://cadvisor.labelcraft.io

![cadvisor-monitoring](https://cloud.githubusercontent.com/assets/1631162/8363339/38036994-1b4c-11e5-86a1-4fad3f968bfe.png)

The cAdvisor tool allows us to seamlessly review and analyze our EC2 instance machine performance, as well as dive into the container specific metrics. The information is presented in a simple but efficient html format that can be accessed anytime and anywhere. Insights or warning can be discovered through useful graphs and metrics on memory usage, cpu usage, throughput, and processes. Container specific metrics are valuable to review anomalies in the exact service, reducing debugging time, and allowing for service specific optimizations. 

### [Sophos](https://www.sophos.com/en-us.aspx)

The sophos security appliance allows us to visualize and react to security threats.  The sophos appliance provides intrusion detection / intrusion prevention (IDS/IPS) and web application firewall to reverse proxy requests to the Docker hosts.  Incoming requests are analyzed for security concerns and then dealth with according to our solutions security posture.  Notifications of login attempts and other security events notify administrators immediately.  Relevant metrics are reported to appropriate individuals on a daily basis.

A small snippit of a report is shown below.

![sophos-monitoring](https://cloud.githubusercontent.com/assets/11528424/8512957/aff7a316-2326-11e5-92c4-1f35fd7b1f0a.png)

All administrative access to the environment is performed over secure VPN tunnel.  A VPC provides isolation of the instances from neighboring environments in the AWS IaaS.  Docker instances are deployed into a separate subnet from the Sophos appliance in the DMZ.  We apply SSL-by-default, all servers are protected by a valid SSL certificate, and HTTP requests to the site are redirected to SSL automatically.

![Network Deployment](https://cloud.githubusercontent.com/assets/8406690/8513155/a8c11102-232d-11e5-8cd5-9ea748f1e537.png)

### [slack](https://slack.com/)

We used slack integrations to keep a consistent eye on any activity with Github and Jenkins. GitHub pushes and pull requests could be immediately observed in the slack app. Also, using a Jenkins plugin we were able to get immediate notifications on any deployments being orchestrated by the Jenkins CI. This monitoring kept the team in synch with what was being released to the different environments and if there were any build, test, or deployment failures. 
