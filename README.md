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
The hardest part of understanding the Genetic Algorithm is the structure that it uses. To make it more comphrensive, I will attempt to organize a class hierarchy and I will include some images.
So, there are three main "running" classes, and three "object" classes. The "running" class perform some tasks, and the "object" classes store mass amounts of data.
The three running classes are:
connectionsaccess.js
Database.js
WorkingClass.js

connectionsaccess.js takes the data from the from the csv file and uses line-by-line analysis to collect data into different arrays and dictionaries.
Database.js takes those array and dictionaries and creats the "object" data classes, which is what the WorkingClass.js file uses. It also runs the npm start, which runs the webpage.

Anyways, enjoy browsing the scheduling app!

From Team Members,
Aarav Mistry, Jon Qunell, Max Nguyen, and Selina Ling
