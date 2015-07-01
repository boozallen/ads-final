
![agile_process_v1](https://cloud.githubusercontent.com/assets/12210910/8392521/1186de50-1cb3-11e5-8be1-594f4bc00538.png)

**Our Agile Process**

We executed this challenge with an agile approach, delivering working software every four hours, and building in an ability to respond to change. Initially the project was planned over a 4 day period - with 2 sprints and 1 release each day. We added a couple of sprints (sprint 8 and 9) to increase the usability of the prototype at the end.

We had an part-time agile coach to help guide our process and encourage whole-team collaboration. 

**Sprint Zero**

Before we began core development, we spent time in our Sprint 0: setting up our development environment, including a continuous delivery infrastructure, and going through ideation/human centered design techniques to understand the value we could create and ultimately decide what to build. We also ensured we had a cross-functional team and a productive co-located space to work.

Release 1 to 4 took place over a period of 4 days (2 sprints per day), with a release every day. Release 5 took place over a period of 2 days (2 8 hour sprints) - with only front-end developers and a usability tester working these sprints. The purpose of release 5 was to increase the usability of the site based on feedback from usability testing.

Release 1 (Day 1)
- Sprint 1 (4 hours)
- Sprint 2 (4 hours)

Release 2 (Minimal Viable Product) - Day 2
- Sprint 3 (4 hours)
- Sprint 4 (4 hours)

Release 3 (Day 3)
- Sprint 5 (4 hours)
- Sprint 6 (4 hours)

Release 4 (Day 4)
- Sprint 7 (4 hours)

Release 5 - only front-end development to increase usability based on usability testing
- Sprint 8 (8 hours)
- Sprint 9 (8 hours)

As we executed, we followed a simple pattern: 
 1. Release Planning - Plan each day as a release
 1. Sprint Planning - Plan and execute two 4-hour sprints per day, using whole-team estimation and buy-in
 1. Sprint Demonstration - Demo each Sprint's output, receiving feedback from the team and interested parties
 1. Retrospective - Conduct a retrospective after each release, to adapt our work for the next release

Work was captured as user stories (expressing a need and value), and broken down into technical tasks. We estimated each task and captured the planned user stories for each sprint. We also captured the velocity for each sprint and used that as input into our next sprints. 

User stories are archived on our wiki here - https://github.com/booz-allen-agile-delivery/ads-final/wiki/User-Stories

**Team Velocity and User Stories Completed**

![Forecast v Delivered](https://docs.google.com/spreadsheets/d/1G-NvVVx-vwliAliHfOq_wRlQ8tPzwEFE9XcevvABsXQ/pubchart?oid=1410313000&format=image)

![Velocity](https://docs.google.com/spreadsheets/d/1G-NvVVx-vwliAliHfOq_wRlQ8tPzwEFE9XcevvABsXQ/pubchart?oid=1374894241&format=image)

##Agile Practices Used
1. Ideation/visioning session
1. Pair programming and peer review
1. Kanban board (Physical)
1. Sprint planning
1. Whole-team planning
1. Timeboxed iterations (4 hrs)
1. Sprint review
1. Co-location/Osmotic communication
1. Sprint planning and review
1. Release planning and review
1. User stories
1. Prioritized backlog
1. API-driven development
1. Wireframes/Mockups
1. Human-Centered Design (incl. user research, brainstorming, dot-voting, wireframes/mockups, usability testing)
1. Regular user-feedback
1. Cross-functional team
1. Retrospectives (after each release)
1. Frequent demos
1. Personas
1. Product Owner
1. Roadmaps
1. Agile estimation (story points), whole-team estimation 

### Sprint 0 Activities
These activities took place prior to beginning primary delivery efforts:
 1. Ideation - activities to decide what to build, how we could deliver value
 1. Establishing continuous integration/delivery infrastructure
 1. Establishing development environment
 1. Assembling the team
 1. Finding the co-located space
 1. Establishing an initial backlog

### Team collaboration

![team_203531399_ios](https://cloud.githubusercontent.com/assets/11546190/8334813/e73537ac-1a67-11e5-8bd6-127b02f7ad73.jpg)
One of the backend-developers working with the DevOps team to diagnose an issue with the deployment.  The Agile Scrum wall can be seen in the background.

![team_203539152_ios](https://cloud.githubusercontent.com/assets/11546190/8334814/e73987e4-1a67-11e5-9e3e-e2e787809280.jpg)
In the background, the front-end designer consult with one of the subject matter experts, a 25-year verterin of the FDA, who stopped by to offer suggestions.

![dotvoting2](https://cloud.githubusercontent.com/assets/11546190/8334806/e72d78be-1a67-11e5-9b77-e37863b31202.jpg)
The team votes on a name of a product by placing colored stickies onto product names of their choice.

![team_215402232_ios](https://cloud.githubusercontent.com/assets/11546190/8346848/926577f0-1ad0-11e5-8b73-47f463968cff.jpg)
One of the front-end developer's and the DevOps team watch as the backend team demonstrate one of the new features.


### Day 1 
Schedule

![daily_schedule](https://cloud.githubusercontent.com/assets/11546190/8309591/47dc304e-1999-11e5-97ff-085feee94b6b.jpg)
The daily schedule post in the team room depicting four-hour sprints followed by all-hands demonstrations and retrospectives.

* 8:30 AM Breakfast 
* 9:00 AM Sprint 1 begins
* 1:00 PM Demo and Retrospective
* 1:00 PM Lunch 
* 2:00 PM Sprint 2 begins
* 6:00 PM Dinner and Retrospective

![day_1_starting_activities](https://cloud.githubusercontent.com/assets/11546190/8309592/47dc7040-1999-11e5-9c01-bfcc6d6ce280.jpg)
The team worked on the plan for how to get-started on the first day.

#### Sprint 1  
Primary target for this first Sprint: User story 001: As a consumer, I want to search and select a drug so that I can see more information about that drug.  

![sprint_1_plan](https://cloud.githubusercontent.com/assets/11546190/8309594/47dfac56-1999-11e5-8b95-d4a86cf401ba.jpg)

Planned for this sprint: 
* UI for search (2 pts)  
* Structure a service to access FDA API (2 pts)
* Mockups/styles for Search & Select (2 pts)
* Complete the Digital Service Playbook checklist (1 pt)
* Define git flow (1 pt)
(Total planned 8 points)

Significant events
* During this sprint, we started exploring a new way we could crowdsource keeping drug labels up to date; ongoing conversation and design sessions will drive some future stories

At the Sprint 1 Demo:
* User Story 001 done
* Drug search bar - can type into it, will bring up a drug and brief description
  * Running on local - not deployed yet
  * Completed stories:
  * UI for search (2 pts)  
  * Structure a service to access FDA API (2 pts)
  * Mockups/styles for Search & Select (2 pts)
  * Complete the Digital Service Playbook checklist (1 pt)
* Incomplete stories:
  * Define git flow (1 pt)
(Completed 7 points)

![sprint_1_done](https://cloud.githubusercontent.com/assets/11546190/8309590/47dbb402-1999-11e5-99c1-a84d43e40209.jpg)


Feedback: 
* Approach Sprint 2 with test-first methods/have more unit tests
* Run Sprint 2 demo on a "Release" environment

Completed 7 points out of the 8 points forecast
  
#### Sprint 2 

![sprint_2_plan](https://cloud.githubusercontent.com/assets/11546190/8309182/0496ec40-1997-11e5-9e71-dea3160564a5.jpg)

User story 002: As a consumer, I want to see a list of reported adverse effects for a selected drug so I can understand the risk of taking the drug.

Stories planned:
- Search by brand name for adverse events (1)
- populate list of adverse effects (2) 
- Fix search UI bugs (3) 
- Unit tests for UI (1)
- 3 environments (3)
- Napkin usability (2) 
- Wire for "napkin" (dependency) (2) 

Forecast a total of 14 points for this sprint

At the Sprint 2 Demo:
- Search by brand name for adverse events (1)
- populate list of adverse effects (2) 
- Fix search UI bugs (3) 
- Unit tests for UI (1)
- 3 environments (3)
- Napkin usability (2) 
- Wire for "napkin" (dependency) (2) 

Completed 14 points

![sprint_2_done](https://cloud.githubusercontent.com/assets/11546190/8309593/47ddedc6-1999-11e5-9848-26d3b41ef721.jpg)

#### Day 1 Retrospective
![day_1_retro](https://cloud.githubusercontent.com/assets/11546190/8309181/0493e414-1997-11e5-8c9b-c172b37f7be0.jpg)

Positive:
- Lunch
- Coffee
- Build pipeline
- Accommodate scope change
- SME involvement
- Forecasts worked
- People spoke up
- Demos
- 4 hour iterations

Negative:
- Missing key resource (sick)
- Pivoting conversation may have been interruptive
- Documentation artifacts perhaps behind

Change
- Start promptly at 9 AM
- Review documents Wednesday afternoon
- Get desks, monitors (Nico)
- Get cleanup

### Day 2

#### Day 2 Overall Plan
We planned our overall release, along with some additional functionality which would likely come along in Day 3 -- prioritized, we had our guiding plan:
![day_2_plan](https://cloud.githubusercontent.com/assets/11546190/8309180/04932236-1997-11e5-80cf-5f78cdc58151.jpg)

#### Sprint 3
Focus for Sprint 3: Making our Day 1 progress smoother, better-looking, easier to use; and beginning progress on the Crowdsourcing user story -- primarily on the backend.

![sprint_3_plan](https://cloud.githubusercontent.com/assets/11546190/8309183/0499e8b4-1997-11e5-85b2-a9e7b02d5030.jpg)

Graphical refinement for user stories 001 & 002 
(landing page, search, list of reported effects)
- Enable search on enter/select (1)
- Filter autocomplete to reduce duplicates (2) 
- Reviewing site text, title (2)
- How to be agile diagram (2)
- Revise reported adverse effect API to return top 50 (1)

User story 004: As a crowdsourcing user, I want to record adverse effects mentioned on the label, based on a scan/preselection of the label text, using simple clicks, so that I can contribute to the value of the database in this tool.

Tasks planned:
- Graph mockup (1)
- Crowd sourcing wires (2)
- Database/scheme for storing label adverse effects data (1) 
- Describe API FE-BE for accessing suggestion adverse effects from label (2)
- API for submitting an adverse effect from the label (2)
- Implement search of label text, return suggested (2) 
- Rails, models 2 APIs for label adverse effects (1) 

Forecasted 19 points

![sprint_3_done](https://cloud.githubusercontent.com/assets/11546190/8314648/c91acc32-19b8-11e5-8885-f628da9495c9.jpg)
At the sprint 3 demo: 
 
- Completed 17 points
     - Graph mockup (1)
     - Crowd sourcing wires (2)
     - Database/scheme for storing label adverse effects data (1) 
     - Describe API FE-BE for accessing suggestion adverse effects from label (2)
     - API for submitting an adverse effect from the label (2)
     - Implement search of label text, return suggested (2) 
     - Rails, models 2 APIs for label adverse effects (1) 
- Incomplete stories: 
     - Implementing the search to return suggested adverse effects from the label text

#### Sprint 4
Plan
![sprint_4_plan](https://cloud.githubusercontent.com/assets/11546190/8314650/c92a1c8c-19b8-11e5-9ba6-f00f1eb2124b.jpg)

User story 004: As a crowdsourcing user, I want to record adverse effects mentioned on the label, based on a scan/preselection of the label text, using simple clicks, so that I can contribute to the value of the database in this tool. 

Tasks planned:

- Implement search of label text, return suggested (2)
- UI to show label text & suggested adverse effects (needs wire) (2)
- Submit effects from user to backend (2)
- UI for submitted state (1)
- UI in place for text submission (1) 
- Chart add seriousness (2) 
- Persona for crowdsourcing foundation/address (1)
- Add generic bottle picture (1)
- Reviewing site text, title (3)
- Mockup (HiFi) crowdsourcing (2)

Documentation planned:
- Continuous integration details (1)
- Digital service play evidence (1)
- Continuous deployment details (1)
- Digital services check list (1)
- Continuous delivery details (1)
- End-to-end continuous delivery w/ tools + products - raft update (1)

Forecasted 24 points

At the sprint 4 demo: 
 
- Completed  points
     - Graph mockup (1)
     - Crowd sourcing wires (2)
     - Database/scheme for storing label adverse effects data (1) 
     - Describe API FE-BE for accessing suggestion adverse effects from label (2)
     - API for submitting an adverse effect from the label (2)
     - Implement search of label text, return suggested (2) 
     - Rails, models 2 APIs for label adverse effects (1) 
- Incomplete points:
     - Implementing the search to return suggested adverse effects from the label text

#### Day 2 Retrospective

![day_2_retro](https://cloud.githubusercontent.com/assets/11546190/8334802/e727ab46-1a67-11e5-9354-5fa5b545b829.jpg)

Start:
- Setup Rails environments
 
Stop:
- Merges right before demos

Do More:
- Front-end unit tests
- Release the Master
- Front end documentation
- Peer Review

Do Less:
- (nothing)

### Day 3 

#### Day 3 Roadmap
![day_3_roadmap](https://cloud.githubusercontent.com/assets/11546190/8335146/d94cc1da-1a69-11e5-97cf-3238ac004ef8.jpg)

0. Site text, vision, message (content)
Style guide
1. Finish submitting suggested label adverse effects
1. Submit a new (text entry) adverse effect
1. Ensure responsive design
1. Deploy continuous monitoring
1. Display crowdsource statistics -> filling pill bottle indicator?

Report + fix bugs

#### Sprint 5
![sprint_5_plan_with_us](https://cloud.githubusercontent.com/assets/11546190/8334811/e7348bcc-1a67-11e5-812d-7bf5c2ada37c.jpg)

Primary target for the fifth sprint: continuing to work on user stories 004, 005, and 006.

Planned for this sprint: 
* Intro purpose statement (1)
* Site test (3)
* Submit effects from user to BE (rec & test) (2)
* UI + text for submitted state (2)
* Determine responsive design concerns (1)
* Record/Publish CI/test metrics (2)
* Integrate Promotheus (3)
* Create alerts (1)

Forecasted 15 points

Significant events
* During this sprint, we decided to shift from an earlier "checkbox" UI approach, to a simple "yes-no" question approach, for a better UX

![sprint_5_mid_sprint_adjust](https://cloud.githubusercontent.com/assets/11546190/8334808/e730ccb2-1a67-11e5-9b49-fd1e8aaccace.jpg)
So we rewrote User Story 006 as User Story 007, and realized we didn't need User Story 005.

#### Sprint 5 Demo
 * We did not finish creating the continuous monitoring alerts in Sprint 5 (1 pt)
 * We did complete some unplanned usability testing on our crowdsourcing feature (2 pts)
 * Based on usability feedback, we were able to jump ahead to the (unplanned for this sprint) upcoming task of implementing the simpler "yes/no" UI for our crowdsourcing feature (2 pts)
 * Based on usability feedback, we completed a change to our site title, from MineMed to CrowdMed (1 pt)

![sprint_5_done](https://cloud.githubusercontent.com/assets/11546190/8340070/051f21b6-1a8a-11e5-8761-ecd1199699b2.jpg)

### Sprint 6

#### Sprint 6 Plan
![sprint_6_plan](https://cloud.githubusercontent.com/assets/11546190/8340071/051f7f58-1a8a-11e5-9766-bca1e7550f97.jpg)

Primary target for the sixth sprint: continuing to work on user stories 004 and 007.

Planned for this sprint: 
* Decide on "help" text (1)
* Show 5 sentences, label text each time (not whole label) (3)
* Bold/emphasize a found word from the label text (2)
* Implement usability recs from testing (2) 
* Obscure upcoming questions (2)
* Deploy site text onto site (2) 
* Define "progress" or "verified" for crowdsourced data (2)
* Chart mockup sync (2)
* Research alerts (2)
* Make load testing available (1)
* Publish/viz more metrics (2)
* Wiki doc for Human Centered Design (3)

Forecasted 24 points

#### Sprint 6 Review

15 points done:
![sprint_6_done_2](https://cloud.githubusercontent.com/assets/11546190/8346846/925f4e34-1ad0-11e5-806d-e9854b637ca2.jpg)

Incomplete Sprint 6 items:
![in-progress-after-sprint-6](https://cloud.githubusercontent.com/assets/11546190/8346847/92605de2-1ad0-11e5-9760-3a024a111b89.jpg)


#### Sprint 7 Plan
![sprint 7 plan](https://cloud.githubusercontent.com/assets/12210285/8392170/ad90a7ae-1cae-11e5-9a9c-b64548f2c463.jpeg)

Primary target for the sixth sprint: continuing to work on user stories 004 and 007.

Planned for this sprint: 

* Update "help" text (1)
* Write value proposition on why to contribute (1)
* Write instructions on how to report averse effects (1)
* Fix progress bar on crowdsourcing chart (1)
* Fix Weird Dates on frequency chart (1)
* Define "progress" or "verified" for crowdsourced data (2)
* Overall Page Style (10)
* Publish/viz more metrics (2)
* Create Monitoring Alerts (1)
* Wiki doc for Human Centered Design (3)

Forecasted 23 points

#### Sprint 7 Review
![sprint 7 done](https://cloud.githubusercontent.com/assets/12210285/8392185/655bf32a-1caf-11e5-9db9-4428c47b2c36.jpeg)
23 points done:

Incomplete Sprint 7 items:
None

#### Sprint 8

#### Sprint 8 Plan

Primary Target for this sprint – cleanup and usability

Forecasted points = 6

-	Landing Page Updates (1)
-	Update Leader Board (2)
-	Graph – color for Icons and Legend (1)
-	Fix Tree Graph (2)

![sprint 8 plan](https://cloud.githubusercontent.com/assets/12210285/8434386/1b49471c-1f19-11e5-93fc-bcae1628051e.jpeg)

#### Sprint 8 Review

![sprint 8 done](https://cloud.githubusercontent.com/assets/12210285/8434593/44bac25a-1f1a-11e5-84be-9c9c8c295678.jpeg)

All tickets successfully completed - 6 story points

#### Sprint 9

#### Sprint 9 Plan

![sprint 9 plan](https://cloud.githubusercontent.com/assets/12210285/8435674/ac8573c0-1f20-11e5-8178-68ec0922f909.jpeg)

#### Sprint 9 Review

![sprint 9 done](https://cloud.githubusercontent.com/assets/12210285/8435673/ac82e966-1f20-11e5-8d46-b3a731f3114a.jpeg)
