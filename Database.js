const { WorkingClass} = require("./WorkingClass.js");
const {Room} = require("./Room.js");
const {Teacher} = require("./Teacher.js");
const {Classes} = require("./Classes.js");
const {Schedule} = require("./Schedule.js");
const {run} = require("./connections_access.js");
const {GeneticRepresentation} = require("./GeneticRepresentation.js")
let fs = require('fs');

class Database
{
    constructor(roomArray, classArray, teacherArray, teacherDiction, roomDiction)
    {
        this.theRoomArray = roomArray;
        this.theClassArray = classArray;
        this.theTeacherArray = teacherArray;
        this.teacherCLog = teacherDiction;
        this.roomCLog = roomDiction;
        this.myRoomArray = [];
        this.myTeacherArray = [];
        this.myClassArray = [];
        //this.myClass1Array;
        //this.myClass2Array;
        //this.myClass3Array;
        

        for (let i = 0; i < /*teacherArray.length*/ this.theTeacherArray.length; i++)
        {
            var teacher = new Teacher(this.theTeacherArray[i], this.teacherCLog(this.theTeacherArray[i]));
            this.myTeacherArray.push(teacher);
        }

        for (let i = 0; i < /*classArray.length*/ this.theClassArray.length; i++)
        {
            var classes = new Classes(this.theClassArray[i]);
            this.myClassArray.push(classes);
        }

        for (let i = 0; i < /*roomArray.length*/ this.theRoomArray.length; i++)
        {
            var room = new Room(this.theRoomArray[i], this.roomCLog(this.theRoomArray[i]));
            this.myRoomArray.push(room);
        }
        
        //console.log(this.myRoomArray.sort());
        // console.log(this.myClassArray);
        // console.log(this.myTeacherArray);

    }

    //made getter methods for each array
    get RoomArray()
    {
        return this.myRoomArray;
    }
    get TeacherArray()
    {
        return this.myTeacherArray;
    }
    get ClassArray()
    {
        return this.myClassArray;
    }
    get ClassPeriodArray()
    {
        return this.myClassPeriodArray;
    }
}

async function script(){
    //console.log("BEGINNING TESTING");
    //console.log("-----------------");
    var returned_data = await run();

    //NEED TO CREATE LOCAL VARIABLES WITH ROOMWITHCLASSES AND ROOM WITH TEACHERS FOR USE 

    let teacher_data = returned_data['teacher'];
    let room_data = returned_data['room'];
    let class_data = returned_data['class'];

    let teacherClassLog = returned_data['TeachersWithClasses'];
    let roomClassLog = returned_data['roomWithClasses'];

    var data = new Database(room_data, class_data, teacher_data,teacherClassLog,roomClassLog);
    
    //this is a WorkingClass object that does the initiial generation within the constructor, so the initial gens of schedule are already set, you only need
    //  call the mutation and eagle_purge method when you want
    let theObj = new WorkingClass(data.RoomArray.sort(), data.TeacherArray, data.ClassArray);
    
    
    
    //Printer method to display raw schedule data
    var gene = new GeneticRepresentation(theObj.multiverseArray);
    gene.represent();

    
    //return theObj;
    /*
    for (let i = 0; i < theObj.multiverseArray.length; i++)
    {
        //console.log("Fitness for Schedule number: " + (i+1));
        //console.log(testObj.multiverseArray[i].schedule.toString());
        //console.log(the Obj.fitness(theObj.multiverseArray[i].schedule));
        //console.log(' ');
        }
    */
    
    // var schedular = theObj.multiverseArray[Math.floor(Math.random() * theObj.multiverseArray.length)].schedule; //schedule[1]
    // var csvString = "Period, Room, Teacher, Class\n";
    // let n = 0;
    // schedular.forEach((period) => {
    //     n++;
    //     period.forEach((room) => csvString += n + ',' + room.room_number + ',' + room.room_teacher + ',' + room.room_class + '\n');
    // });
    
    // fs.writeFile("thingy.csv",csvString,(err) => err && console.error(err));
    
}
script();
module.exports.script = script; 