# scheduling-app
The repository for the scheduling app.

Hello! Welcome to the ReadMe file of the scheduling app!

The four Software Engineering students working on this are: Aarav Mistry, Jon Qunell, Max Nguyen, and Selina Ling

In terms of what this app is supposed to do (or what it should eventually do) is:

Take teacher profiles, lists of classes, and applicable rooms
Create randomly generated schedules based on that
Make new, better schedules after applying a genetic algorithm
Return select best schedules
Download the best schedule
The main files are such:

In the folder JQStuff, is all the code for the current webpage; to run it, call npm start after following the start up doc
The Database.js file contains the run file for the code, the function to call is script()
The WorkingClass.js file contains all the code that runs the genetic algorithm
The GeneticRepresenation.js file contains the code that lets you see the schedule in the terminal; this is very useful for debugging
The things.csv file just has a random schedule stored, it is just used to check if other files work properly.
The fitness function will be your friend, it is used to determine the best schedule and rank all schedules. It takes in a lot of data and just spits out a percentage, which is very cool!

Here is the naming glossary for most of the variables from the WorkingClass.js file: 
LOWEST LEVEL: Teacher Class List → list of class they can teach Name → their name

Class Class name → the rame of the class

MID-LOWEST LEVEL: Room Teacher → teacher associated with room Class → class associated with room Room Number → the room number Class List → list of classes compatible with the room

MIDDLE LEVEL: ClassPeriodArray A array of rooms for a given period

MID-HIGHEST LEVEl: Schedule Array → array of classPeriodArrays Percentage → fitness percentage

HIGHEST LEVEL: Generation MultiverseArray → array of Schedules generation no → what number generation it is on

Anyways, enjoy browsing the scheduling app!

From Team Members, Aarav Mistry, Jon Qunell, Max Nguyen, and Selina Ling
