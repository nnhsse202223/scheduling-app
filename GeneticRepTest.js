/* Genetic Represenation of the best children from this generation
    (and best parent)
        This includes the Teacher, Room, & Class classes
*/
const {WorkingClass, test} = require("./WorkingClass.js");
const {Room} = require("./Room.js");
const {Teacher} = require("./Teacher.js");
const {Classes} = require("./Classes.js");

this.room1 = new Room(129, "FACS");
this.room2 = new Room(130, "FACS");
this.room3 = new Room(121, "Tech");
this.teacher1 = new Teacher("AgentP", "FACS");
this.teacher2 = new Teacher("AngelP","Business");
this.teacher3 = new Teacher("Schmitt", "Tech");
this.class1 = new Classes("Senior Foods", "FACS");
this.class2 = new Classes("Business Incubator", "FACS");
this.class3 = new Classes("Software Engineering 1/2", "Tech");
this.class4 = new Classes("Italian Culinary", "FACS");
this.class5 = new Classes("Accounting 1", "Business");
this.class6 = new Classes("AP Computer Science A", "Tech");
this.class7 = new Classes("South Easu Asian Culinary", "FACS");
this.class8 = new Classes("Blended Busniness Days", "Business");
this.class9 = new Classes("Cybersecruity", "Tech");
this.myRoomArray = [this.room1, this.room2, this.room3];
this.myTeacherArray = [this.teacher1, this.teacher2, this.teacher3];
this.myClassArray = [this.class1, this.class2, this.class3, this.class4, this.class5, this.class6, this.class7, this.class8, this.class9];


let teacherTester = 'Sissel';
let repDataTester = [
    {period: 1, class: 'Programming 1', room: '123', coTeacher: null},
    {period: 2, class: 'Programming 1', room: '123', coTeacher: null},
    {period: 4, class: 'Programming 2', room: '123', coTeacher: null},
    {period: 7, class: 'AP Com Sci', room: '121', coTeacher: null},
    {period: 8, class: 'Consumer Ec', room: '128', coTeacher: 'Lynne'}
];
// FIXME: update with the created classes
// Currently [Period, Class, Room, Co-Teacher]

//console.log(repDataTester);
// This version lists it out in the same way that repDataTester is currently formatted above

for(var i = 0 ; i < repDataTester.length ; i++){
    var repDataRows = repDataTester[i];
    console.log(`Period: ` + repDataRows.period + `\tClass: ` + repDataRows.class + `\tRoom: ` + repDataRows.room
        + `\tCo-Teacher Name: ` + repDataRows.coTeacher);
}