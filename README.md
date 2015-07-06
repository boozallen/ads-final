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

Technical Approach Pool Three

**(a)**

We assigned one leader, our Product Owner (PO), who had the authority and responsibility and was held accountable for the quality of our labelCRAFT prototype submission.  Our PO had the authority to allocate resources and funding to create the prototype.  The PO was responsible for defining the initial prototype concept and attended all release planning, sprint planning and demonstrations. The PO made the decisions about backlog priorities.
Our user stories for labelCRAFT:

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/User-Stories.md

**(b)**

We decided that we wanted to build a prototype that not only intuitively displayed data from 2 of the 3 FDA datasets but also included a backend data repository / front end user interface to capture input data for label data crowdsourcing.  Given this scope, we assembled a multidisciplinary and collaborative team using 10 of the 13 labor categories (LCATs).   The LCATs used were 1) Product Manager, 2) Technical Architect, 3) Interaction Designer/User Researcher/Usability Tester, 4) Writer/Content Designer/Content Strategist, 5) Visual Designer, 6) Frontend Web Developer, 7) Backend Web Developer, 8) DevOps Engineer, 9) Delivery Manager, and 10) Agile Coach.

Our humans.txt file: 

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/www/app/humans.txt

**(c)**

From the beginning of our prototype development, we included ‘people’ throughout the process to understand their needs and get their feedback on our design and development.  On day 1, we led an ideation session with “people” (two Booz Allen FDA Drug andData SMEs), the PO and the 18F BPA “agile team”. We developed multiple hypotheses about our target audiences and their needs along with sketches of personas. We validated and updated these through in-person and phone-based user interviews and usability testing. Our in-person, moderated usability testing also provided qualitative behavioral data on user goals that was incorporated into the wireframes as well as personas.

Our human-centered design process--

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/Human-Centered-Design.md

**(d)**

We used nine core Human Centered Design (HCD) techniques: (1) Visioning exercise to brainstorm target groups, emotional benefits, and features/services to meet their needs; (2) User Interviews; (3) Personas; (4) Journey Mapping; (5) User Stories; (6) Sketching screen designs; (7) Rapid Prototyping with clickable Axure Wireframes; (8) Heuristic Reviews based on researched best practices and industry standards for desinging for real, live people; (9) Usability Testing in four small-scale iterative rounds of moderated, in-person testing.

**(e)**

We used a bootstrap design style theme that mirrored our vision for the prototype. We chose a design to help the team understand the direction for the styling and components that we would develop. As we matured our wireframes, we used this design as a foundation but modified the styling to meet our UX needs. We then developed a design style guide and provided the team with our core design specifications.  We provided wireframes and a set of high fidelity mockups of the complete design vision for the prototype to the developer to implement iteratively.

Our style guide, wireframes, and mockups:

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/Design-Documentation.md

**(f)**

We conducted user interviews and usability tests with ‘people’ that mapped to  each of our hypothesized persona types. We conducted two rounds of usability testing (4-5 participants each round) on the wireframes. We moderated in-person usability test sessions where we walked through unstructured impressions on layout, navigation, content and interaction. We made significant changes based on people feedback.

Our usability testing--

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/Usability-Testing.md

**(g)**

We developed labelCRAFT using an iterative approach where feedback informed subsequent versions of the prototype.  We had a Sprint ‘0’ followed by 10 Sprints.  In Sprint 0, we tailored Booz Allen Digital’s existing agile development tools and environment which includes a continuous delivery infrastructure..  We then delivered 6 releases over a period of 6 days. We conducted sprint planning at the beginning of each sprint and then conducted a prototype demonstration and retrospective at the end of each sprint. The FDA SMEs and PO attended the planning sessions, the reviews, and provided feedback that informed subsequent work.

We detail our iterative agile process here:

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/Agile-Artifacts.md

**(h)**

Our labelCRAFT prototype works on multiple devices (e.g., desktop, mobile, tablet) and is a responsive design. We implemented our front-end with the Boostrap framework to provide a completely responsive experience across all devices. We conducted usability tests to observe users on these platforms. We also used Google’s chrome mobile display test tool to emulate the experience of different platforms.

Our responsive design is detailed here:

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/Responsive-Design.md

**(i)**

We developed labelCRAFT with 14 modern, open source technologies. We selected these technologies because we felt they were most appropriate to implement the prototype:

•	Front-End: Bootstrap, Angular.JS, Node.js, Karma, JS Hint, HighCharts
•	Backend: Ruby, Rails, RSpec, Rubocop, Brakeman
•	Dev-Ops: Docker (Machine, Registry, Compose), Jenkins, cAdvisor

Our application stack and the tools we used:

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/Architecture-Diagrams.md

**(j)**

We deployed labelCRAFT on the Amazon Web Service Elastic Compute Cloud (EC2) IaaS.  

Our physical deployment model is shown here:

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/Architecture-Diagrams.md

**(k)**

We wrote unit tests for code, written with appropriate tooling for the technology stack. We used Karma for front-end code and used rSpec for the backend API. Our unit testing enabled a fluid development process while leveraging the respective language specific advantages of each testing technology. The unit tests were executed both locally and on the continuous integration server (Git push).

**(l)**

We use Jenkins as our continuous integration system to automate the running of tests and continuously deploy our code to AWS.  We established GitHub hooks for each branch to kickoff Jenkins jobs. Custom jobs for each branch ran automated tests in containerized environments. Once tests were completed, Jenkins CI updated the Docker registry and deployed the new build. All pushes to the development branch are automatically examined by static code analysis, security scans, unit tests, integration tests, and performance tests. Load testing was performed ad-hoc (developer’s discretion).

Our devops workflow is detailed here:

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/DevOps-Process.md

Our automated testing approach is detailed here:

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/Automated-Testing.md

**(m)**

We used Docker’s tool suite for configuration management to provision and post-provision AWS EC2 instances so they are immediately ready for Docker-based deployments. After provisioning, the Docker engine pulls and builds containers from the Docker repository. Docker Compose implicitly injects the appropriate environment variables into the containers to connect frontend to API to database. The /bin directory in the repo contains all the necessary scripts to utilize the described Docker workflow.

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/DevOps-Process.md

**(n)**

We use Sophos and cAdvisor for continuous monitoring.  We use Sophos as a security appliance to give us continuous feedback on the state of our solution’s risk posture. Sophos additionally offers security controls to minimize any active cyber threats. We also chose to enforce encryption by default via SSL. We use cAdvisor to generate details of our containerized services.  What about slack??

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/Continuous-Monitoring.md

**(o)**

We used Docker-engine to build Linux containers from custom Dockerfiles stored in our Git repository. We containerized All three tiers of our application stack. We wrote Dockerfiles using Docker’s recommended best practices to maximize the caching features of the Docker tool.  This allows for quicker builds, which is important as the Docker image is rebuilt after every push.

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/DevOps-Process.md

**(p)**

We provide instructions to install and run our prototype on another machine here: 

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/INSTALL.md

**(q)**

We used all open source technologies for this prototype.

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/documentation/Architecture-Diagrams.md

We have also open sourced our labelCRAFT prototype. The open source license is available at:

https://github.com/booz-allen-agile-delivery/ads-final/blob/development/LICENSE
