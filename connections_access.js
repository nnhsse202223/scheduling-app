let fs = require('fs');
const {Room} = require("./room.js");
const {Teacher} = require("./Teacher.js");

let teacherData = fs.readFileSync('TeacherData.csv',{encoding:'utf8'}, (err) => err && console.error(err));
let csvArray = teacherData.split(/\r?\n|\r|\n/g); //I dont know how that splits it, but it worked!!!
let classes = csvArray[7].split(',');
let rooms = csvArray[1].split(',');
let periods = csvArray[5].split(',');
let sections = csvArray[3].split(',');

function run() {
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
    if(!teacher_array.includes(taughtClasses[0]))
      {
        teacher_array.push(taughtClasses[0]);
      }
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
    if(!class_array.includes(classes[i]))
    {
      class_array.push(classes[i]);
      classDictWithTeachers[classes[i]] = [];
      classDictWithRooms[classes[i]] = [];
      classDictWithPeriods[classes[i]] = [];
      classDictWithSections[classes[i]] = [];
    }
  }

  //Getting all possible classes into rooms in format {class, [teacher, weight]}
  for(let i = 8; i < csvArray.length; i++)
  {
    let taughtClasses = csvArray[i].split(',');
    for(let j = 1; j < taughtClasses.length; j++)
    {
      if(taughtClasses[j] != "")
      {
        let teach = new Teacher(taughtClasses[0]);
        
        teach.addLunch();
        if(!classDictWithTeachers[classes[j]].includes(teach))
        {
          //console.log(taughtClasses[j]);
          teach.set_weight(Number(taughtClasses[j]));
          classDictWithTeachers[classes[j]].push(teach);
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
      if(!classDictWithRooms[classes[i]].includes(room))
      {
        classDictWithRooms[classes[i]].push(room);
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
      if(!classDictWithPeriods[classes[i]].includes(period))
      {
        classDictWithPeriods[classes[i]].push(period);
      }
    }
  }

  //Getting all possible classes into sections in format {class, [sections]}
  for(let i = 1; i < classes.length; i++)
  {
    let section = sections[i];
    if(!classDictWithSections[classes[i]].includes(section))
    {
      //console.log(section);
      //classDictWithSections[classes[i]].push(section);
      classDictWithSections[classes[i]].push(Number(section));
    }
  }

  return {class: class_array, teacher: teacher_array, room: room_array, classWithTeachers: classDictWithTeachers, classWithRooms: classDictWithRooms, classWithPeriods: classDictWithPeriods, classWithSections: classDictWithSections};
}

module.exports.run = run;
