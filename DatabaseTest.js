const { WorkingClass} = require("./WorkingClass.js");
const {Room} = require("./Room.js");
const {Teacher} = require("./Teacher.js");
const {Classes} = require("./Classes.js");
//const {ClassPeriod} = require("./ClassPeriod.js");
class DatabaseTest
{
    constructor()
    {
        this.myRoomArray;
        this.myTeacherArray;
        this.myClass1Array;
        this.myClass2Array;
        this.myClass3Array;
        this.room1 = new Room(129, "FACS");
        this.room2 = new Room(123, "Business");
        this.room3 = new Room(121, "Tech");
        this.teacher1 = new Teacher("AgentP", "FACS");
        this.teacher2 = new Teacher("AngelP","Business");
        this.teacher3 = new Teacher("Schmitt", "Tech");
        this.class1 = new Classes("Senior Foods", "FACS");
        this.class2 = new Classes("Business Incubator", "Business");
        this.class3 = new Classes("Software Engineering 1/2", "Tech");
        this.class4 = new Classes("Italian Culinary", "FACS");
        this.class5 = new Classes("Accounting 1", "Business");
        this.class6 = new Classes("AP Computer Science A", "Tech");
        this.class7 = new Classes("South East Asian Culinary", "FACS");
        this.class8 = new Classes("Blended Busniness Days", "Business");
        this.class9 = new Classes("Cybersecruity", "Tech");


        this.myRoomArray = [this.room1, this.room2, this.room3];
        this.myTeacherArray = [this.teacher1, this.teacher2, this.teacher3];
        this.myClassArray = [this.class1, this.class4, this.class7, this.class2, this.class5, this.class8, this.class3, this.class6, this.class9];

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
    get ClassPeriodArray()
    {
        return this.myClassPeriodArray;
    }
}
var testDatabase = new DatabaseTest();

var testObj = new WorkingClass(testDatabase.RoomArray, testDatabase.TeacherArray, testDatabase.ClassArray);
console.log(testObj.fitness(testObj.scheduleArray));
//for (let i = 0; i < 9; i++)
{
    //console.log("Schedule for initial number: " + i);
    //console.log(testObj.fitness(testObj.multiverseArray[i]));
}