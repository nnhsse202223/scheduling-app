let fs = require('fs');
const {Room} = require("./room.js");
const {Teacher} = require("./Teacher.js");

function run() {
  let teacherData = fs.readFileSync('TeacherData.csv',{encoding:'utf8'}, (err) => err && console.error(err));
  let csvArray = teacherData.split(/\r?\n|\r|\n/g); //I dont know how that splits it, but it worked!!!
  let classes = csvArray[7].split(',');
  let rooms = csvArray[1].split(',');
  let periods = csvArray[5].split(',');
  let sections = csvArray[3].split(',')
  let semesters = csvArray[4].split(',');

  var teacher_array = [];
  var room_array = [];
  var class_array = [];

  var classDictWithTeachers = {}; //new
  var classDictWithRooms = {}; //new
  var classDictWithPeriods = {}; //new
  var classDictWithSections = {}; //new

  //Separating data into just teachers
  for(let i = 8; i < csvArray.length; i++)
  {
    let taughtClasses = csvArray[i].split(',');
    teacher_array.push(taughtClasses[0]);
  }

  //Separating data into just rooms
  for(let i = 1; i < rooms.length; i++)
  {
    let roomNumbers = rooms[i].split(' | ');
    for(let j = 0; j < roomNumbers.length; j++)
    {
      let roomNumber = roomNumbers[j]
      if(!room_array.includes(roomNumber))
      {
        room_array.push(roomNumber);
      }
    }
  }
    
  //Separating data into just classes
  for(let i = 1; i < classes.length; i++)
  {
    if(semesters[i].split(" | ").includes("1"))
    {
      class_array.push(classes[i]);
      classDictWithTeachers[classes[i]] = [];
      classDictWithRooms[classes[i]] = [];
      classDictWithPeriods[classes[i]] = [];
      classDictWithSections[classes[i]] = [];
    }
    if(semesters[i].split(" | ").includes("2"))
    {
      //...
    }
  }

  //Getting all possible classes into rooms in format {class, [teacher]}
  for(let i = 8; i < csvArray.length; i++)
  {
    let taughtClasses = csvArray[i].split(',');
    let teach = new Teacher(taughtClasses[0]);
    teach.addLunch();
    for(let j = 1; j < taughtClasses.length; j++)
    {
      if(taughtClasses[j] != "")
      {
        
        teach.set_weight(+taughtClasses[j]);
        if(semesters[j].split(" | ").includes("1"))
        {
          classDictWithTeachers[classes[j]].push(teach);
        }
        if(semesters[j].split(" | ").includes("2"))
        {
          //...
        }
      }
    }
  }

  //Getting all possible classes into rooms in format {class, [room]}
  for(let i = 1; i < classes.length; i++)
  {
    let roomNumbers = rooms[i].split(' | ');
    for(let j = 0; j < roomNumbers.length; j++)
    {
      let roomNumber = roomNumbers[j];
      let room = new Room(roomNumber);
      if(semesters[i].split(" | ").includes("1"))
      {
        classDictWithRooms[classes[i]].push(room);
      }
      if(semesters[i].split(" | ").includes("2"))
      {
        //...
      }
    }
  }

  //Getting all possible classes into rooms in format {class, [period]}
  for(let i = 1; i < classes.length; i++)
  {
    let periodNumbers = periods[i].split(' | ');
    for(let j = 0; j < periodNumbers.length; j++)
    {
      let period = periodNumbers[j];
      if(semesters[i].split(" | ").includes("1"))
      {
        classDictWithPeriods[classes[i]].push(period);
      }
      if(semesters[i].split(" | ").includes("2"))
      {
        //...
      }
    }
  }

  //Getting all possible classes into sections in format {class, [sections]}
  for(let i = 1; i < classes.length; i++)
  {
    let section = sections[i];
    if(semesters[i].split(" | ").includes("1"))
    {
      classDictWithSections[classes[i]].push(+section);
    }
    if(semesters[i].split(" | ").includes("2"))
    {
      //...
    }
  }

  return {class: class_array, teacher: teacher_array, room: room_array, classWithTeachers: classDictWithTeachers, classWithRooms: classDictWithRooms, classWithPeriods: classDictWithPeriods, classWithSections: classDictWithSections};
}

module.exports.run = run;
