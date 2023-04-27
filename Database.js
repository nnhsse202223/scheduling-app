const { WorkingClass} = require("./WorkingClass.js");
const {Room} = require("./room.js");
const {Teacher} = require("./Teacher.js");
const {Classes} = require("./Classes.js");
const {Schedule} = require("./Schedule.js");
const {run} = require("./connections_access.js");
const {GeneticRepresentation} = require("./GeneticRepresentation.js")
let fs = require('fs');
const { start } = require("repl");

class Database
{
    constructor(roomArray, classArray, teacherArray, teacherDiction, roomDiction, classSections)
    {
        this.theRoomArray = roomArray;
        this.theClassArray = classArray;
        this.theTeacherArray = teacherArray;
        this.teacherCLog = {};
        this.teacherCLog = teacherDiction;
        this.roomClog = {};
        this.roomCLog = roomDiction;
        this.myRoomArray = [];
        this.myTeacherArray = [];
        this.myClassSections = classSections;
        this.myClassArray = [];
        this.numbers_of_generations = 3000;
        this.theAlphabet = ["A","B","C","D","E","F","G","H"];
        

        for (let i = 0; i < /*teacherArray.length*/ this.theTeacherArray.length; i++)
        {
            //console.log(this.theTeacherArray[i]);
            var teacher = new Teacher(this.theTeacherArray[i]);
            this.myTeacherArray.push(teacher);
        }

        for (let i = 0; i < /*roomArray.length*/ this.theRoomArray.length; i++)
        {
            var room = new Room(this.theRoomArray[i]);
            this.myRoomArray.push(room);
        }
        
        for (let i = 0; i < /*classArray.length*/ this.theClassArray.length; i++)
        {
            //console.log(this.teacherCLog[this.theClassArray[i]][0][0]);
            //for (let k = 0; k < /*teacherArray.length*/ this.myTeacherArray.length; k++) {this.myTeacherArray[k].set_weight(this.teacherCLog[this.theClassArray[i]][0][1])};
            //console.log(this.teacherCLog[this.theClassArray[i]][0]);
            //console.log(this.myTeacherArray[i]);
            //for (let k = 0; k < /*teacherArray.length*/ this.myTeacherArray.length; k++) {this.myTeacherArray[k].set_weight(this.teacherCLog[this.theClassArray[i]])};
            //console.log("sections:" + this.myClassSections[this.theClassArray[i]]);
            var classes = [];
            for(let j = 0; j < this.myClassSections[this.theClassArray[i]]; j++)
            {
                classes = new Classes(this.theClassArray[i] + " " + (this.theAlphabet[j]), this.teacherCLog[this.theClassArray[i]], this.roomCLog[this.theClassArray[i]]);
                this.myClassArray.push(classes);
            }
            
        }

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

function script(){
    console.log("BEGINNING TESTING");
    console.log("-----------------");
    var returned_data = run();

    let teacher_data = returned_data['teacher'];
    let room_data = returned_data['room'];
    let class_data = returned_data['class'];

    let classDictWithTeachers = returned_data["classWithTeachers"];
    let classDictWithRooms = returned_data["classWithRooms"];
    let classDictWithPeriods = returned_data["classWithPeriods"];
    let classDictWithSections = returned_data["classWithSections"];

    var data = new Database(room_data, class_data, teacher_data, classDictWithTeachers, classDictWithRooms, classDictWithSections);
    //this is a WorkingClass object that does the initiial generation within the constructor, so the initial gens of schedule are already set, you only need
    //  call the mutation and eagle_purge method when you want
    let theObj = new WorkingClass(data.RoomArray.sort(), data.TeacherArray, data.ClassArray);
    
    //Making multiple generations of schedules
    var gene = new GeneticRepresentation(theObj.verse);
    //console.log(theObj.verse.theMultiverseArray);
    //gene.represent();

    var theActualVerse;

    //This is to regenerate the schedules
    for (let i = 0; i < data.numbers_of_generations; i++)
    {
        //theActualVerse = theObj.regenerate(theObj.verse);
        //var gene = new GeneticRepresentation(theActualVerse);
        //gene.represent();        
    }
    return theObj;
}
var startTime = performance.now();
script();
module.exports.script = script; 
var endTime = performance.now();
console.log("The time taken to run is " + ((endTime-startTime)/1000) + " seconds")