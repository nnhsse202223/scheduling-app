/* Genetic Represenation of the best children from this generation
    (and best parent)
        This includes the Teacher, Room, & Class classes
*/

const {WorkingClass, test} = require("./WorkingClass.js");
const {Room} = require("./Room.js");
const {Teacher} = require("./Teacher.js");
const {Classes} = require("./Classes.js");
// OLD!
// periods are arrays
// within each period arrays are another array saying room, teacher, classes

// NEW!
// 2d array, X is room numbers, Y is period
// within each array value another array is held that states the teacher and class

class GeneticRepresentation
{
    constructor(schedules, teachers)
    {
        this.teachersSchedulesArray = schedules;
        this.teachersArray = teachers;
        this.returnString = "";

        //check how array.sort() works for a 3d array
        for(var i = 0 ; i < this.teachersArray.length ; i++){
            
        }
    }
    
    represent()
    {
        for(var i = 0; i < this.teachersSchedulesArray.length; i++){
            // For an entire period
            for(var j = 0; j < this.teachersSchedulesArray[i].length ; j++){
                // For each room
                this.returnString += "Name: " + this.teachersSchedulesArray[i][j].room_teacher() +
                    "\tClass: " + this.teachersSchedulesArray[i][j].room_class() +
                    "\tRoom: " + this.teachersSchedulesArray[i][j].room_number();
            }
            this.returnString += "\n";
        }
        //return 
    }
}