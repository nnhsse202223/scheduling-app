# Course Scheduling App

The Course Scheduling App is an app that takes in teacher profiles, lists of classes, and applicable rooms to output a download for the best schedule from the given data through a genetic algorithm.

## Platform Requirements
  - *Javascript Version Compatibility on [w3schools](https://www.w3schools.com/js/js_versions.asp), check which version we use*
  - Node.js

## Installation & Running Code
  - [Download Node.js](https://nodejs.org/en/download)
  - *the ownership of this doc needs to be moved from a school email to a personal one/given to Mr. Schmit. we should also probably force it to make a copy* [Installation & Running Code](https://docs.google.com/document/d/1ALOxzGyS3BOwQFgnIHnT7ABrvpJEfU8J2q1Bybjsdqk/edit?usp=sharing)

## Configuring Project
  - *should we give them a document for this too?*

## Project Architecture & Data Schema

### Main Files
  - *(outdated?)* In the folder JQStuff, is all the code for the current webpage; to run it, call npm start after following the start up doc
  - The Database.js file contains the run file for the code, the function to call is script(). The produced schedule will look similiar to this: [Master Schedule 2022-2023](https://drive.google.com/file/d/1KM-edDdXXMBrGBw3O3NRhsNZboAyz1wB/view?usp=sharing)
  - The TeacherData.csv ------. Example: *the ownership of this doc needs to be moved from a school email to a personal one/given to Mr. Schmit. we should also probably force it to make a copy* [2023-2024 TeacherData Spreadsheet](https://docs.google.com/spreadsheets/d/1OrJanY4l1BxetQadMx8MiPAeRn6vkfdEBdK5Q_P7ygM/edit?usp=sharing)
  	- To get a csv file from a Google Spreadsheet, go to *File* => *Download* => *Comma Seperated Values (.csv)*
  - The WorkingClass.js file contains all the code that runs the genetic algorithm
  - The GeneticRepresenation.js file contains the code that lets you see the schedule in the terminal; this is very useful for debugging

### Genetic Algorithm Classes & Methods
*feel free to move these around to fit with the levels listed below*
  - The Schedule.js
  - The Classes.js
  - The Teacher.js
  - The room.js
  - The fitness method is used to determine the best schedule and rank all schedules, taking in a lot of data and returning a percentage based on given parameters
  - The mutator methods

Here is the naming glossary for most of the variables from the WorkingClass.js file:
LOWEST LEVEL:
Teacher
	Class List → list of class they can teach
	Name → their name

Class
	Class name → the rame of the class

MID-LOWEST LEVEL:
Room
	Teacher → teacher associated with room
	Class → class associated with room
	Room Number → the room number
	Class List → list of classes compatible with the room

MIDDLE LEVEL:
ClassPeriodArray
	A array of rooms for a given period

MID-HIGHEST LEVEl:
Schedule
	Array → array of classPeriodArrays
	Percentage → fitness percentage

HIGHEST LEVEL:
Generation
	MultiverseArray → array of Schedules
	generation no → what number generation it is on


Anyways, enjoy browsing the scheduling app!

From Team Members,
Aarav Mistry, Jon Qunell, Max Nguyen, and Selina Ling

## Known Issues:
*(should these be moved to github issues?)*
  - The current iteration of GeneticRepresentation has a bug that makes it not return anything in period 8, despite the output schedule having classes during this period
  - Our best schedule outputted at the end never has any classes populating period 1, despite the representation stating there are classes during this period
  - Our current code does not always follow Javascript naming conventions or have easily understood naming schemes. Selina plans on cleaning this up before you receive this, but how far they will get will be seen
