let fs = require('fs');

let teacherData = fs.readFileSync('TeacherData.csv',{encoding:'utf8'}, (err) => err && console.error(err));
let csvArray = teacherData.split(/\r?\n|\r|\n/g); //I dont know how that splits it, but it worked!!!
let classes = csvArray[7].split(',');
let rooms = csvArray[1].split(',');

function run() {
  var teacher_array = [];
  var room_array = [];
  var class_array = [];
  var roomDictWithClasses = {}; //probably getting rid of
  var TeacherDictWithClasses = {}; //probably getting rid of

  var classDictWithTeachers = {}; //new
  var classDictWithRooms = {}; //new

  //Separating data into just teachers
  for(let i = 8; i < csvArray.length; i++)
  {
    let taughtClasses = csvArray[i].split(',');
    teacher_array.push(taughtClasses[0]);
    TeacherDictWithClasses[taughtClasses[0]] = [];
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
        roomDictWithClasses[roomNumber] = [];
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
    }
  }

  //Getting all possible classes into rooms in format {room,[Class]}
  for(let i = 1; i < rooms.length; i++)
  {
    let roomNumbers = rooms[i].split(' | ');
    for(let j = 0; j < roomNumbers.length; j++)
    {
      let roomNumber = roomNumbers[j];
      if(!roomDictWithClasses[roomNumber].includes(classes[i]))
      {
        roomDictWithClasses[roomNumber].push(classes[i]);
      }
    }
  }

  //Getting all possible classes into rooms in format {teacher,[Class]}
  for(let i = 8; i < csvArray.length; i++)
  {
    let taughtClasses = csvArray[i].split(',');
    for(let j = 1; j < taughtClasses.length; j++)
    {
      if(taughtClasses[j] != "")
      {
        if(!TeacherDictWithClasses[taughtClasses[0]].includes(classes[j]))
        {
          TeacherDictWithClasses[taughtClasses[0]].push(classes[j]); 
        }
      }
    }
  }

  //Getting all possible classes into rooms in format {class, [teacher]}
  for(let i = 8; i < csvArray.length; i++)
  {
    let taughtClasses = csvArray[i].split(',');
    for(let j = 1; j < taughtClasses.length; j++)
    {
      if(taughtClasses[j] != "")
      {
        if(!classDictWithTeachers[classes[j]].push(taughtClasses[0]))
        {
          classDictWithTeachers[classes[j]].push(taughtClasses[0]);
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
      if(!classDictWithRooms[classes[i]].includes(roomNumber))
      {
        classDictWithRooms[classes[i]].push(roomNumber);
      }
    }
  }

  return {class: class_array, teacher: teacher_array, room: room_array, roomWithClasses: roomDictWithClasses, TeachersWithClasses: TeacherDictWithClasses};
}

module.exports.run = run;
