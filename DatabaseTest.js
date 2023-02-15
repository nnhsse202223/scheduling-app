const { WorkingClass} = require("./WorkingClass.js");
const {Room} = require("./Room.js");
const {Teacher} = require("./Teacher.js");
const {Classes} = require("./Classes.js");
const {Schedule} = require("./Schedule.js");
const {run} = require("./connections_access.js");

class DatabaseTest
{
    constructor(roomArray, classArray, teacherArray)
    {
        this.theRoomArray = roomArray;
        this.theClassArray = classArray;
        this.theTeacherArray = teacherArray;
        this.myRoomArray = [];
        this.myTeacherArray = [];
        this.myClassArray = [];
        

        //this changes the json format to the Object-oriented format that is used in the rest of the code
        for (let i = 0; i < this.theTeacherArray.length; i+=2)
        {
            var teacher = new Teacher(this.theTeacherArray[i], this.theTeacherArray[i+1]);
            this.myTeacherArray.push(teacher);
        }

        for (let i = 0; i < this.theClassArray.length; i+=2)
        {
            var classes = new Classes(this.theClassArray[i], this.theClassArray[i+1]);
            this.myClassArray.push(classes);
        }

        for (let i = 0; i < this.theRoomArray.length; i+=2)
        {
            var room = new Room(this.theRoomArray[i], this.theRoomArray[i+1]);
            this.myRoomArray.push(room);
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

console.log("BEGINNING TESTING");
console.log("-----------------");



//this actually runs the thing, so call the DatabaseTest.js to run all code
var returned_data;
(
    async ()=>{
    returned_data= await run();
    }
)().then(()=>{
    let teacher_data = returned_data['teacher'];
    let room_data = returned_data['room'];
    let class_data = returned_data['class'];

    var testDatabase = new DatabaseTest(room_data, class_data, teacher_data);

    var testObj = new WorkingClass(testDatabase.RoomArray.sort(), testDatabase.TeacherArray, testDatabase.ClassArray);

    console.log(`is schedule 1 == schedule 2: ${testObj.multiverseArray[0].schedule == testObj.multiverseArray[1].schedule}`)
    for (let i = 0; i < testObj.multiverseArray.length; i++)
    {
        console.log("Fitness for Schedule number: " + (i+1));
        //console.log(testObj.multiverseArray[i].schedule.toString());
        console.log(testObj.fitness(testObj.multiverseArray[i].schedule));
        console.log(' ');
    }
})
