const { WorkingClass, test} = require("./WorkingClass.js");
const {Room} = require("./Room.js");
const {Teacher} = require("./Teacher.js");
const {Classes} = require("./Classes.js");
class DatabaseTest
{
    constructor()
    {
        this.myRoomArray;
        this.myTeacherArray;
        this.myClassArray;
        this.room1 = new Room("FACS", 129);
        this.room2 = new Room("FACS", 130);
        this.room3 = new Room("Tech", 121);
        this.teacher1 = new Teacher("AgentP", "FACS");
        this.teacher2 = new Teacher("AngelP","FACS");
        this.teacher3 = new Teacher("Schmitt", "Tech");
        this.class1 = new Classes("Senior_Foods", "FACS");
        this.class2 = new Classes("Junior_Foods", "FACS");
        this.class3 = new Classes("Software Engineering 1/2", "Tech");

        this.myRoomArray = [this.room1, this.room2, this.room3];
       // console.log(this.myRoomArray);
        this.myTeacherArray = [this.teacher1, this.teacher2, this.teacher3];
        this.myClassArray = [this.class1, this.class2, this.class3];
        
    }
    //make getter methods for each array
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
}
var testDatabase = new DatabaseTest();

var testObj = new WorkingClass(testDatabase.RoomArray, testDatabase.TeacherArray, testDatabase.ClassArray);
console.log(testObj.fitness(testObj.scheduleArray));
