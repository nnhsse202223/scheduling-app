# Course Scheduling App

Hello! Welcome to the ReadMe file of the scheduling app!

The four Software Engineering students working on this are:
Aarav Mistry, Jon Qunell, Max Nguyen, and Selina Ling

### This app is supposed to:
  - Take teacher profiles, lists of classes, and applicable rooms
  - Create randomly generated schedules from the above
  - Make new, better schedules after applying a genetic algorithm
  - Select and return the best schedules
  - Output the best schedule for download
  
### The main files are:
  - (outdated?) In the folder JQStuff, is all the code for the current webpage; to run it, call npm start after following the start up doc
  - The Database.js file contains the run file for the code, the function to call is script()
  - The TeacherData.csv
  - The WorkingClass.js file contains all the code that runs the genetic algorithm
  - The GeneticRepresenation.js file contains the code that lets you see the schedule in the terminal; this is very useful for debugging

### The genetic algorithm uses the following classes and methods:
  - The Schedule.js
  - The Classes.js
  - The Teacher.js
  - The room.js
  - The fitness function (isn't it a method?) is used to determine the best schedule and rank all schedules, taking in a lot of data and returning a percentage based on given parameters
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

### Known Issues:
  - The current iteration of GeneticRepresentation has a bug that makes it not return anything in period 8, despite the output schedule having classes during this period
  - Our best schedule outputted at the end never has any classes populating period 1, despite the representation stating there are classes during this period
  - Our current code does not always follow Javascript naming conventions or have easily understood naming schemes. Selina plans on cleaning this up before you receive this, but how far they get will be seen
