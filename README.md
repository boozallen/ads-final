# 18F Agile Delivery Services (ADS) – Booz Allen Digital– Prototype: LabelCRAFT

Prototype Submission URL: https://labelcraft.io

## Prototype Overview

[![Build Status](https://jenkins.labelcraft.io/buildStatus/icon?job=Development_FrontEnd_Builder)](https://jenkins.labelcraft.io/view/Development/job/Development_FrontEnd_Builder/)[![Build Status](https://jenkins.labelcraft.io/buildStatus/icon?job=Development_API_Builder)](https://jenkins.labelcraft.io/view/Development/job/Development_API_Builder/)Development Branch Server: https://dev.labelcraft.io

[![Build Status](https://jenkins.labelcraft.io/buildStatus/icon?job=Release_FrontEnd_Builder)](https://jenkins.labelcraft.io/view/Release/job/Release_FrontEnd_Builder/)[![Build Status](https://jenkins.labelcraft.io/buildStatus/icon?job=Release_API_Builder)](https://jenkins.labelcraft.io/view/Release/job/Release_API_Builder/)Release Branch Server: https://release.labelcraft.io

[![Build Status](https://jenkins.labelcraft.io/buildStatus/icon?job=Master_FrontEnd_Builder)](https://jenkins.labelcraft.io/view/Master/job/Master_FrontEnd_Builder/)[![Build Status](https://jenkins.labelcraft.io/buildStatus/icon?job=Master_API_Builder)](https:/jenkins.labelcraft.io/view/Master/job/Master_API_Builder/)Master Branch Server: https://labelcraft.io

LabelCRAFT is a crowd-sourcing platform with the goal of improving drug labels. Through LabelCRAFT, we are able to determine whether adverse effects reported by consumers are accurately described by the manufacturer on the drug label. By identifying the adverse effects that consumers have reported and are not currently listed on drug labels, we hope to reduce the time it takes for manufacturers to update their labels and better inform consumers.

The challenge with the label data is that it is unstructured and label sections often vary by manufacturer making it difficult to automate the discovery of adverse effects with technology. Simply finding the adverse effect ‘words’ on a label is not sufficient to conclude that the manufacturer has accurately described it as a side effect. We felt This challenge is perfect to solve through the power of crowdsourcing. LabelCraft is crowd-sourcing platform that asks users questions to assess whether adverse effects reported by consumers (from https://open.fda.gov/drug/label/) are found on the drug label (from https://open.fda.gov/drug/event/). To ensure the information we collect is used to its full potential, our data is exposed via an API and documented for third-party application developers.

Booz Allen Digital offers key strengths to the GSA 18F for the ADS BPA:

- **Demonstrated Agile Delivery** – Our firm has strong experience with agile software development as demonstrated on this prototype as well as on GSA Integrated Award Environment (IAE), numerous hackations, and many other federal and commercial engagements.

- **A Culture of Innovation** - Booz Allen's dedication to creating a culture of innovation resulted in formation of a 1,800 team, the Strategic Innovation Group (SIG), whose mission it is to ensure there is focus on agile, digital, next gen analytics and cyber security for all modern solutions.

- **Cross-functional agile skilled staff with reach back to domain SME** – Booz Allen was able to quickly assemble a highly-skilled, cross-functional team for this effort. Booz Allen also has deep knowledge of federal agencies missions. For example, for this efforts, we engaged FDA domain experts from our firm to help us understand the data and come up with our solution concept.

### Digital Services Playbook

The US Digital Services playbook provides a set of guidelines that includes a set of checklists
and questions we believe should be answered during the execution of any digital program. 

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/U.S.-Digital-Services-Playbook-Evidence.md

###Technical Approach Pool Three

**(a)** 

We identified a member of the team who played the role of Product Owner during the development of the prototype. This person had authority with the ability to add or remove features. He attended all release planning, sprint planning and demonstrations and made all final decisions about prioritizing the backlog. 

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/Agile-Artifacts.md

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/User-Stories.md

**(b)**

Booz Allen has been using agile methodologies since early 2000s, including on a number of hackathons (e.g., the My America Summit and GSA Open Tech Digital Innovation Hackathon). This experience helped us to identify the right-sized multidisciplinary team for this effort. We used 10 out of the 13 allowed LCATs.

SEE humans.txt file for a full list of people who worked on the prototype.

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/www/app/humans.txt

**(c)**  

Our team had an ideation session that included the Product Owner, Booz Allen FDA SMEs and the agile team. This led to a number of hypotheses about our target audiences and their needs – along with sketches of personas. We validated and updated these through in-person and phone-based user interviews and usability testing. Our in-person, moderated usability testing also provided qualitative behavioral data on user goals to be incorporated into the wireframes as well as personas.

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/Human-Centered-Design.md

**(d)**

We used multiple human centered design techniques and tools. Our Lean UX ideation session included brainstorming with a visioning game, which ultimately yielded our product charter. It included hand-sketched personas, journey maps, scribbled user stories, and sketched wireframes on large pages in pairs. We then learned more about our users through user interviews and usability testing. Our personas were updated throughout. Our hand-sketched wireframes (Axure) were tested and updated in iterative rounds of usability testing.

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/Human-Centered-Design.md

**(e)**

We selected a bootstrap theme that provided a close resemblance to our vision for the prototype. We chose this approach to help with familiarizing the team with the direction for the styling and components that we would ultimately design around. As our wireframes matured, we used these components as a foundation but modified the styling to meet our needs. We developed a design style guide to provide the team with a general reference point for our core design specifications. Wireframes and a set of high fidelity mockups were provided to provide the complete design vision for the prototype.

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/Design-Documentation.md

**(f)**

We conducted user interviews with each of our hypothesized persona types. They were updated, expanded or removed based on the incoming user data. We conducted two rounds of usability testing (4-5 participants each round) on wireframes. These were moderated in-person usability test sessions where we walked through unstructured impressions on layout, navigation, content and interaction. We made significant changes based on feedback from each round of this small-scale usability testing. 

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/Usability-Testing.md

**(g)**

The prototype was developed over multiple sprints.

Sprint 0 - Setting up our development environment, a continuous delivery infrastructure, and going through ideation/human centered design techniques to understand the value we could create and ultimately build.

We delivered 6 releases over a period of 6 days, with Release 2 the MVP. The Product Owner attended all release planning sessions and provided feedback on the creation and prioritization of the user stories.

Sprint Planning was done at the beginning of each sprint with a prototype demonstration and retrospective at the end of each sprint. The Product Owner attended all of these and provided input into the prioritization of user stories for the sprint.

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/Architecture-Diagrams.md

**(h)**

Our front-end application was implemented with the Boostrap framework to provide a completely responsive experience across all types of display sizes. We conducted testing on multiple platforms (i.e. desktop, tablet, phone) and conducted usability tests to observe users on these platforms. We used the Google chrome mobile display test tool to emulate the experience of different platforms.

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/Responsive-Design.md

**(i)**

Our selection of technologies (more than 5 modern, open-source technologies)  was driven by the language, frameworks, the libraries most appropriate to solve the problem, the ability for the technology to conform to modern development best practices, and tools that best support the full end-to-end life cycle of development. It included:

- Front-End: Bootstrap, Angular.JS, Node.js, Karma, JS Hint, HighCharts
- Backend: Ruby, Rails, RSpec, Rubocop, Brakeman
- Dev-Ops: Docker (Machine, Registry, Compose), Jenkins, cAdvisor

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/Architecture-Diagrams.md

**(j)**

Amazon Web Service Elastic Compute Cloud (EC2) was used to host shared computing resources needed during for the project.

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/Architecture-Diagrams.md

**(k)**

Unit testing was done with development and written with appropriate tooling for the technology stack. Karma was used for the front-end code and rSpec was used for the backend API. Both allowed for a fluid development process and leveraged their respective language specific advantages. The unit tests were executed both locally and on the continuous integration server (Git push).
 
 https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/DevOps-Process.md

**(l)**

Jenkins was used as our continuous integration tool. GitHub hooks were established for each branch to kickoff Jenkins jobs. Custom jobs for each branch ran automated tests in containerized environments. Once tests were completed, Jenkins CI updated the Docker registry and deployed the new build. All pushes to the development branch are automatically examined by static code analysis, security scans, unit tests, integration tests, and performance tests. Load testing was performed ad-hoc (developer’s discretion).

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/DevOps-Process.md

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/Automated-Testing.md

**(m)**

The Docker’s tool suite, was used to provision and post-provision AWS EC2 instances so they are immediately ready for Docker-based deployments. After provisioning, the Docker engine pulls and builds containers from the Docker repository. Docker Compose implicitly injects the appropriate environment variables into the containers to connect frontend to API to database. The /bin directory in the repo contains all the necessary scripts to utilize the described Docker workflow.

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/DevOps-Process.md

**(n)**

Our continuous monitoring solution consists of Sophos and cAdvisor. Sophos is used as a security appliance to give us continuous feedback on the state of our solution’s risk posture. Sophos additionally offers security controls to minimize any active cyber threats. We also chose to enforce encryption be default via SSL. For more visibility into our operations, cAdvisor was implemented to generate details of our containerized services.

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/Continuous-Monitoring.md

**(o)**

Docker-engine was used to build Linux containers from custom Dockerfiles stored in our Git repository. All three tiers of our application stack are containerized. Dockerfiles were written using Docker’s recommended best practices, to maximize the caching features of the Docker tool. This allows for quicker builds, which is important as the Docker image is rebuilt after every push.

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/DevOps-Process.md

**(p)**

Installation instructions are included in the repo.

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/INSTALL.md


**(q)**

All of the technologies we used for this prototype are open source.

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/Architecture-Diagrams.md

We have also open sourced this solution. Open source license is available at:

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/LICENSE

