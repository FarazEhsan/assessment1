# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

## Assumption 1: Same agent could be assigned to differnt Facility shifts at different times

## Ticket 1

Ticket 1: Database cahnges to store custom id info related to agent
High Level Def
Need to make database changes (DDL) for enabling the facilities to add custom ids for the agents who work with them. The database changes involve creation of relation-table (MtoM) as different custom agents can be assigned with custom ids by different facilities.

Definition of Done
1- A new table in the database will be created to relate Agent to custom id assigned by a Facility
TableName: FacilityToAgent
Columnss: {facilityID: Integer, agentID: Integer, custom_id: nvarchar}
Constraits: {facilityID FK from Facilities, agentID FK from Agents}, CompositePK (facilityID,agentID)

Acceptance Criteria
1- 'FacilityToAgent' table ecists in the database with above defined schema
2- The table is accessable to the required role being used by the API

Level of Effort: 2 story points

Categrory: DB

## Ticket 2

Ticket 2: CRUD API for the new custom agent id data
High Level Def
Need to develop Create/Read/Update/Delete endpoints for the FacilityToAgent table
Definition of Done
1- Follwoing endpoints will be created
GetFacilityAgentId(agentid, facilityId): Get
CreateFacilityAgentId(agentid, facilityId, customId): POST
UpdateFacilityAgentId(agentid, facilityId): PUT
DeleteFacilityAgentId(agentid, facilityId): POST

Acceptance Criteria
1- The above mentioned endpoints have been created
2- Each endpoint has a passing unit test chekedin to the repo

Level of Effort: 3 story points

Categrory: App Dev

## Ticket 3

Ticket 3: Application related changes for Facility Admin Panel
High Level Def
Need to update the Facility Admin Panel to add an option to create custom id for agents
Definition of Done
1- Provide an 'Add Custom ID' option in the form for a button inside Agent Profile
2- Clicking on 'Add Customer ID' option must open a modal with a text form filed and submit button
3- Save custom id in database using the API
4- Replace the AgentId inside Agent profile with custom Id by ussing the GetFacilityAgentId endpoint

Acceptance Criteria
1- Agent profile in the Facility Admin Panel has been updated
2- Units tests have been commited to the repo

Level of Effort: 3 story points

Categrory: App Dev

## Ticket 4

Ticket 4: Update the 'getShiftsByFacility' method and related view
High Level Def
The process for getting shifts by facility must now show agent's custom Id instead of database Id
Definition of Done
1- getShiftsByFacility will call the GetFacilityAgentId(agentid, facilityId) to get agent's custom Id
2- ViewModel bound to view consuming getShiftsByFacility will now have an additional field of 'custom_id'
3- Shifs By facility report will show custom agent id instaed of database id

Acceptance Criteria
1- Shifts by Facility screen shows agent custom Id
2- Unit tests have been updated, passed and commited to the repo

Level of Effort: 2 story points

Categrory: App Dev

## Ticket 5

Ticket 4: Update the 'generateReport' method and related view
High Level Def
Generate report will now show agent's custom Id in the list of shifts section of the pdf
Definition of Done
1- generateReport will call the GetFacilityAgentId(agentid, facilityId) to get agent's custom Id
2- PDF generation wil include agent's custom id instead of database Id in the shits section

Acceptance Criteria
1- PDF report shows agent's custom id based on Facility instead of database Id
2- Unit tests have been updated, passed and commited to the repo

Level of Effort: 2 story points

Categrory: App Dev
