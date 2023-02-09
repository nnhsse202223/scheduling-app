/* Genetic Represenation of the best children from this generation
    (and best parent)
        This includes the Teacher, Room, & Class classes
*/

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
        for(var period = 0; period < 8; period++){
            // For an entire period
            console.log("Period " + (period+1));
            for(var i = 0; i < this.schedule[period].length ; i++){
                // For each room

                //only pulls from the final period (8)
                console.log("Name: " + this.schedule[period][i].room_teacher +
                    "\t\tClass: " + this.schedule[period][i].room_class +
                    "\t\tRoom: " + this.schedule[period][i].room_number);
            }
            console.log();
        }

        console.log("\t\tFitness: " + this.workingClass.fitness(this.schedule) + "\n");
    }
}

module.exports.GeneticRepresentation = GeneticRepresentation;