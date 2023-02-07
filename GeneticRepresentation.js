/* Genetic Represenation of the best children from this generation
    (and best parent)
        This includes the Teacher, Room, & Class classes
*/

const {WorkingClass} = require("./WorkingClass.js");
const {Schedule} = require("./Schedule.js");
const {Room} = require("./Room.js");

// OLD!
// periods are arrays
// within each period arrays are another array saying room, teacher, classes

// NEW!
// 2d array, X is room numbers, Y is period
// within each array value another array is held that states the teacher and class

class GeneticRepresentation
{
    constructor(schedules, workingClass)
    {
        this.teachersSchedulesArray = schedules;
        this.workingClass = workingClass;
        this.returnString = "";

        //check how array.sort() works for a 3d array
        /*for(var i = 0 ; i < this.teachersArray.length ; i++){
            
        }*/
    }
    
    updateSchedules(schedules)
    {
        this.teachersSchedulesArray = schedules;
    }

    represent()
    {
        this.schedule = this.teachersSchedulesArray.schedule;
        //console.log(this.schedule[0]);
        console.log(this.schedule.length);
        var returnString = "";
        for(var i = 0; i < this.schedule.length; i++){
            // For an entire period
            console.log("Period " + (i+1));
            for(var j = 0; j < this.schedule[i].length ; j++){
                // For each room
                console.log(this.schedule[j]);

                //look into how console.log prints in WorkingClass.js
                returnString = "Name: " + this.schedule[j].room_teacher() +
                    "\tClass: " + this.schedule[j].room_class() +
                    "\tRoom: " + this.schedule[j].room_number();
                console.log(returnString);
            }
            returnString = "\t\tFitness: " + this.workingClass.fitness(this.schedule) + "\n";
            console.log(returnString);
        }
        return this.returnString;
        //console.log(this.returnString);
        
    }
}

module.exports.GeneticRepresentation = GeneticRepresentation;