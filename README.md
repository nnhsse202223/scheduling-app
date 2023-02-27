# scheduling-app
The repository for the scheduling app.

Hello! Welcome to the ReadMe file of the scheduling app!

The four Software Engineering students working on this are:
Aarav Mistry, Jon Qunell, Max Nguyen, and Selina Ling

In terms of what this app is supposed to do (or what it should eventually do) is:
  - Take teacher profiles, lists of classes, and applicable rooms
  - Create randomly generated schedules based on that
  - Make new, better schedules after applying a genetic algorithm
  - Return select best schedules
  - Download the best schedule
  
The main files are such:
  In the folder JQStuff, is all the code for the current webpage; to run it, call npm start after following the start up doc

  The Database.js file contains the run file for the code, the function to call is script()

  The WorkingClass.js file contains all the code that runs the genetic algorithm

  The GeneticRepresenation.js file contains the code that lets you see the schedule in the terminal; this is very useful for debugging

  The things.csv file just has a random schedule stored, it is just used to check if other files work properly.

The fitness function will be your friend, it is used to determine the best schedule and rank all schedules.

Anyways, enjoy browsing the scheduling app!

From Team Members,
Aarav Mistry, Jon Qunell, Max Nguyen, and Selina Ling
