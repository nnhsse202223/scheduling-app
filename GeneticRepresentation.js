/* Genetic Represenation of the best children from this generation
    (and best parent)
        This includes the Teacher, Room, & Class classes
*/

const {WorkingClass} = require("./WorkingClass.js");

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
        /*
        //this.returnString = "";
        for(var i = 0; i < this.teachersSchedulesArray.length; i++){
            // For an entire period
            for(var j = 0; j < this.teachersSchedulesArray[i].length ; j++){
                // For each room
                this.returnString += "Name: " + this.teachersSchedulesArray[i][j].room_teacher() +
                    "\tClass: " + this.teachersSchedulesArray[i][j].room_class() +
                    "\tRoom: " + this.teachersSchedulesArray[i][j].room_number();
            }
            var wc = new WorkingClass(this.roomsArray, this.teachersArray, this.classesArray);
            this.returnString += "\t\tFitness: " + wc.fitness() + "\n";
        }
        return this.returnString;
        */
       this.workingClass.printer();
       console.log(this.workingClass.fitness(this.teachersSchedulesArray));
    }
}

module.exports.GeneticRepresentation = GeneticRepresentation;