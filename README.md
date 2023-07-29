# Course Scheduling App

The Course Scheduling App is an app that takes in teacher profiles, lists of classes, and applicable rooms to output a download for the best schedule from the given data through a genetic algorithm.

## Platform Requirements
  - *Javascript Version Compatibility on [w3schools](https://www.w3schools.com/js/js_versions.asp), check which version we use*
    - *definitely forgot that Node.js is seperate from Javascript oops, check what version Node.js we're using and its platform requirements*
  - Node.js

## Installation & Running Code
  - [Download Node.js](https://nodejs.org/en/download)
    - You'll need to install Node on personal computers as well as chromebooks if you want to code outside of class.
  - Once you have Node, you shouldn't need to install npm. We use a few packages that you'll need to install. Run these commands in the terminal (the VScode one should be fine): *npm install fs*, *npm install express*, and *npm install nodemon*
  - Running code: if you want to test code without the sever, you'll need to uncomment the line "script()" in Database.js, then you can just type in the terminal *node Database.js*
  - Running the server: input *npm start* into the VScode terminal, and then you can control click the localhost website to see it running. To stop the server, press *Ctrl + C* and then type *Y* when it asks.

## Project Architecture & Data Schema

### Main Files
  - Client folder: all files sent to client (html, css)
  - index.js contains all server code
  - The Database.js file contains the run file for the code, the function to call is script(). The produced schedule will look similiar to this: *the ownership of this doc needs to be moved from a school email to a personal one/given to Mr. Schmit. we should also probably force it to make a copy* [Master Schedule 2022-2023](https://drive.google.com/file/d/1KM-edDdXXMBrGBw3O3NRhsNZboAyz1wB/view?usp=sharing)
  - The TeacherData.csv file. Example: [2023-2024 TeacherData Spreadsheet](https://docs.google.com/spreadsheets/d/1OrJanY4l1BxetQadMx8MiPAeRn6vkfdEBdK5Q_P7ygM/edit?usp=sharing)
  	- To get a csv file from a Google Spreadsheet, go to *File* => *Download* => *Comma Seperated Values (.csv)*
  - The WorkingClass.js file contains all the code that runs the genetic algorithm
  - The GeneticRepresenation.js file contains the code that lets you see the schedule in the terminal; this is very useful for debugging

### Genetic Algorithm Classes & Methods
The hardest part of understanding the Genetic Algorithm is the structure that it uses. To make it more comphrensive, I will attempt to organize a class hierarchy and I will include some images.
So, there are three main "running" classes, and three "object" classes. The "running" class perform some tasks, and the "object" classes store mass amounts of data.

**The three running classes are:**
  - The connectionsaccess.js takes the data from the from the csv file and uses line-by-line analysis to collect data into different arrays and dictionaries
  - The Database.js takes those array and dictionaries and creats the "object" data classes, which is what the WorkingClass.js file uses. It also runs the npm start, which runs the webpage
  - The WorkingClass.js takes the "object" classes and performs the algorithm

**The three main "object" classes are:**
  - Teacher.js
  - Room.js
  - Classes.js
These three classes are the base line of our data, and anything around it supports the class hierarchy. The documation within each class will explain each class, and it's parameter.

**How the genetic algorithm works:**
  - When initially generating a schedule, what the algorithm does is starts putting data into a Classes object.
  - There is a ClassArray, which lists all the sections of the class, and other random, valid information gets put into the Classes.
    - So, for every Class in the ClassArray, they randomly assign a classPeriod, a Teacher, and a Room. If there are conflicts, like same classPeriod, or teacher or room is not available that period, it will choose a different classPeriod, or Teacher, or Room.
  - After all the classArray gets data added to it (which is the optimized way to gather data), the way we organize and collect data is via the teacherArray. This is due to the fact that the teacherArray is formatted better for the output. So once the class gets assigned a teacher, the same teacher in the teacher array gets info added to it.
  - Of course, we have a fitness function that rates how good our schedule is, but it currently outputs 100% for everything.
  - There is also mutator methods, which constitutes our genetic algorithm piece, but it is currently out of commision.
  
**The info that gets added is this format:**
  - There is two arrays in the Teacher.js "object" class, one of which holds classes, and the other, rooms.
  - Each array has 8 elements, one of each classPeriod. Once the classPeriod and teacher, and rooms get added to the class in the classArray, at the same time, the room and class gets added at the index of the classPeriod.

Code that we started then scrapped was the actual "genetic" part: this code is found later on in workingclass. The code shouldn't function (as it was room-centric, before we changed all of the code to class-centric). The skeleton code is there, I'm sure you can make it work with Mrs. Oskroba. 

**Class Hierachy:**
  - There is a class heirachy, for the way are data is structured. The lowest level is the "object" classes, which are Classes.js, Teacher.js, and Room.js.
  - It then goes into classArray and teacherArray.
  - Those two array are the two components of Schedule.js, which is one schedule.
  - And finally, the two parameters of Generation.js is the array of Schedules, and each of its fitness is within the Schedule.js, and it is a parameter of it.

Please let us know if you cannot access any documents or if you need more of an explanation! 

Anyways, enjoy browsing the scheduling app! 

Team Members:
Aarav Mistry, Jon Qunell, Max Nguyen, and Nox Ling
