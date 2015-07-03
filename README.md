# 18F Agile Delivery Services – Booz Allen – Prototype: Label Craft

Prototype Submission URL: http://52.0.46.33:9000/

## Prototype Overview

[![Build Status](http://52.0.92.86:8080/buildStatus/icon?job=Development_FrontEnd_Builder)](http://52.0.92.86:8080/view/Development/job/Development_FrontEnd_Builder/)[![Build Status](http://52.0.92.86:8080/buildStatus/icon?job=Development_API_Builder)](http://52.0.92.86:8080/view/Development/job/Development_API_Builder/)Development Branch Server: http://52.4.69.219:9000/

[![Build Status](http://52.0.92.86:8080/buildStatus/icon?job=Release_FrontEnd_Builder)](http://52.0.92.86:8080/view/Release/job/Release_FrontEnd_Builder/)[![Build Status](http://52.0.92.86:8080/buildStatus/icon?job=Release_API_Builder)](http://52.0.92.86:8080/view/Release/job/Release_API_Builder/)Release Branch Server: http://54.175.96.243:9000/

[![Build Status](http://52.0.92.86:8080/buildStatus/icon?job=Master_FrontEnd_Builder)](http://52.0.92.86:8080/view/Master/job/Master_FrontEnd_Builder/)[![Build Status](http://52.0.92.86:8080/buildStatus/icon?job=Master_API_Builder)](http://52.0.92.86:8080/view/Master/job/Master_API_Builder/)Master Branch Server: http://52.0.46.33:9000/ or www.crowdmed.io

Label Craft is a crowd-sourcing platform for cataloging the adverse reactions
found on drug labels. This information on labels must be converted into
structured data to be able to identify whether drug labels have accurately
captured the adverse effects that end users are experiencing.

Data collected by the platform is displayed on the site for each drug and also
is made accessible via a public API for integration with third-party
applications. The Label Craft platform provides the foundation for additional
improvements to the quality of FDA data through crowd-sourcing.

Our approach taken on this challenge and the resulting outputs showcase the
value that Booz Allen brings to the 18F BPA including the following:

-   Proven Agile Delivery – Our firm’s extensive experience in the successful
    delivery of both small and large Agile programs [ensures that we will be
    successful in the BPA.]

-   A Culture of Innovation - Booz Allen's dedication to creating a culture of
    innovation resulted in formation of the Strategic Innovation Group (SIG)
    whose mission it is to ensure there is focus on innovation in all programs.

-   Experienced Staff – Booz Allen was able to quickly assemble a
    highly-skilled, cross-functional team in order to support the ADS challenge.
    We were also able to tap into a set of domain experts across the firm each
    of whom had multiple years of experience in FDA.

## Understanding:

### RFQ

We understand 18f’s goal to select a candidate to the Agile BPA to deliver
digital services and agile methodologies based on their ability to provide
appropriate resources demonstrated through a sample prototype.  We believe our
prototype is an exceptional demonstration of our ability to provide these
resources to the Agile BPA.

### Digital Services Playbook

The US Digital Services playbook provides an invaluable set of guidelines for
the delivery of digital programs. The USDS playbook includes a set of checklists
and questions we believe are intended to be answered during the execution of any
digital program.  Our responses to the checklist are contained in the artifact
linked below:

[Link to the Digital Services Checklist] (https://github.com/booz-allen-agile-delivery/ads-final/wiki/U.S.-Digital-Services-Playbook-Evidence)

### 18F
The 18F five key principles provide an important emphasis to Agile concepts aimed
to promote the success of delivery in programs, especially those for the Govt.

1.  Put the needs of users first

2.  Release early, iteratively, and often

3.  Don’t slow down delivery

4.  Only do it if it adds value

5.  Work in the open

 
Our process applied by our Agile team demonstated each of these principles.  

For a more detailed mapping of our process to the 18F tenets, see the artifact
below:

[Link to 18F Tenets] (18F\_TENETS.md)

### Architecture/Tools

Instructions to build the software are provided in the artifact below:

[Build Instructions] (Link to INSTALL.md)

Our architecture consists of a modern technology stack that reflect current best
practices for web application development.  The selection of technologies was
driven by the following value propositions:

-   Support for multiple cloud environments through Docker and Docker Machine

-   Technologies appropriate for task (Ruby for backend, Angular for Front-End
    Single-Page-App (SPA))

-   DevOps Best Practices - Configuration Management using GitFlow

-   Security – Sophos Firewall, AWS VPC and Security Groups

For more information on our architecture, see the artifact below:

[Link to Architecture Image] (https://github.com/booz-allen-agile-delivery/ads-final/wiki/Architecture-Diagrams)

###Technical Approach Pool Three

**(a)** 

We identified a member of the team who played the role of Product Owner during the development of the prototype. This person had sufficient authority with the (1) ability to add or remove features. He attended all (2) release planning, (3) sprint planning and (4) demonstrations and made all final decisions about prioritizing the backlog. 

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/Agile-Artifacts.md

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/User-Stories.md

**(b)**

Our multidisciplinary team was composed of following 10 LCATs:

- 1) Category 1   - Product Manager
- 2) Category 2   - Tech Architect
- 3) Category 3   - Interaction designer
- 4) Category 4   - Writer, content designer
- 5) Category 5   - Visual Designer
- 6) Category 6   - Front-end Dev
- 7) Category 7   - Back-end Dev
- 8) Category 8   - DevOps Engineer
- 9) Category 10 - Delivery Manager
- 10) Category 11 -  Agile Coach 

See our humans.txt file for a full list of people who worked on the prototype.

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/www/app/humans.txt

**(c)**  

As part of sprint zero our team had an ideation session that included the Product Owner, Booz Allen FDA subject matter experts and the agile team.  This session led to a number of hypotheses about our target audiences and their needs – along with sketches of personas. We validated and updated these personas throughout our project, through in-person and phone-based user interviews and usability testing. Our in-person, moderated usability testing also provided qualitative behavioral data on user goals to be incorporated into the wireframes as well as personas.

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/Human-Centered-Design.md

**(d)**

We used multiple human centered design techniques and tools throughout the process.  Our Lean UX ideation session included brainstorming with a visioning game which ultimately yielded our product charter.  The process included (1) hand-sketched personas, (2) journey maps, (3) scribbled user stories, and (4) sketched wireframes on large pages in pairs. We then learned more about our users through (5) user interviews (in person and by phone) and (6) usability testing. Our personas were living documents that were updated as we learned more. Our hand-sketched wireframes were moved into (7) Axure, and were tested and updated in iterative rounds of usability testing. 

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/Human-Centered-Design.md

**(e)**

We began the design process by selecting a bootstrap theme that provided a close resemblance to our vision for the prototype. We chose this approach to help with familiarizing the team with the direction for the styling and components that we would ultimately design around. As our wireframes matured, we used these components as a foundation but modified the styling to meet our needs. We developed a design style guide to provide the team with a general reference point for our core design specifications. This includes: In addition to the design style guide, wireframes and a set of High Fidelity mockups were provided to provide the complete design vision for the prototype.

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/Design-Documentation.md

**(f)**

We conducted user interviews with each of our hypothesized persona types. These personas were updated, expanded or removed based on the incoming user data. We conducted two rounds of usability testing (4-5 participants in each round) on wireframes created in Axure. These were moderated, in-person usability test sessions where the participants pulled up our wireframes and walked through unstructured impressions on layout, navigation, content and interaction. We made significant changes based on both preference and behavioral data from each round of this small-scale usability testing. 

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/Usability-Testing.md

**(g)**

The prototype was developed over 10 sprints. This included the following:

Sprint 0 - Setting up our development environment, including a continuous delivery infrastructure, and going through ideation/human centered design techniques to understand the value we could create and ultimately decide what to build.

We delivered 4 releases over a period of 4 days (1 release per day). Release 2 was also the MVP release (Minimal Viable Product). The Product Owner attended all release planning sessions and provided feedback on the creation and prioritization of the user stories for the release.
 
Sprint Planning was done at the beginning of each sprint and a (2) prototype demonstration and (3) retrospective at the end of each sprint. The Product Owner attended all of these and provided input into the prioritization of user stories for the sprint.

All user stories were broken down into tasks and estimated during each sprint planning session. We tracked estimated and completed story points and team velocity.

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/Agile-Artifacts.md

**(h)**

Responsive Design

**(i)**

Five modern technologies

**(i)**

Amazon Web Service Elastic Compute Cloud (EC2) was used to host any shared computing resources needed during for the project. 

**(k)**

Unit testing was done in conjunction with development and written with appropriate tooling for the technology stack in use. Karma was used for the front-end code and rSpec was used for the backend API. Both these tools allow for developers to keep their development process fluid and leverage their respective language specific advantages. The unit tests were executed both locally on the developer’s machines and again on the continuous integration server upon a Git push. 
 
 https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/DevOps-Process.md

**(l)**

Jenkins was used as our continuous integration tool. GitHub hooks were established for each branch to kickoff Jenkins jobs. Custom Jenkins jobs for each branch ran automated tests in containerized environments. Once tests were completed, Jenkins CI would update the Docker registry and deploy the new build. All pushes to the development branch are automatically examined by static code analysis, security scans, unit tests, integration tests, and performance tests. Load testing was performed ad-hoc, at the developer’s discretion.

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/DevOps-Process.md

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/Automated-Testing.md

**(m)**

Configuration management was greatly simplified by leveraging Docker’s tool suite, which encapsulates away many traditional configuration steps. Docker Machine was used to provision and post-provision AWS EC2 instances so they are immediately ready for Docker-based deployments. After provisioning, the Docker engine pulls and builds containers from the Docker repository. Docker Compose implicitly injects the appropriate environment variables into the containers to connect frontend to API to database.   The /bin directory in the repo contains all the necessary scripts to utilize the described Docker workflow.

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/DevOps-Process.md

**(n)**

We set up and used cAdvisor (cAdvisor available at https://github.com/google/cadvisor)  to establish continuous monitoring. The cAdvisor tool cleanly presents a variety of metrics through a website to determine the health of the environment and its running containers, including CPU usage, memory usage, and running process metrics. Alerts are sent to relevant slack channels for any GitHub changes and Jenkins build results.

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/Continuous-Monitoring.md

**(o)**

Docker-engine was used to build Linux containers from custom Dockerfiles stored in our Git repository. All three tiers of our application stack are containerized. Dockerfiles were written using Docker’s recommended best practices, to maximize the caching features of the Docker tool. This allows for quicker builds, which is important since we are rebuilding the Docker image after every push.

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/DevOps-Process.md

**(p)**

Installation instruction is a two lines Docker command. 
--> we'll also have a docker file architecture diagram

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/INSTALL.md


**(q)** Open Source Usage
