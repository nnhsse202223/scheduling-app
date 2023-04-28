/* Genetic Represenation of the best children from this generation
    (and best parent)
        This includes the Teacher, Room, & Class classes
*/

// NEW!
// 2d array, X is room numbers, Y is period
// within each array value another array is held that states the teacher and class

class GeneticRepresentation
{
    constructor(schedules)
    {
        this.teachersSchedulesArray = schedules.theMultiverseArray;
        this.gen = schedules.genNo;
    }
    
    updateSchedules(schedules)
    {
        this.teachersSchedulesArray = schedules.theMultiverseArray;
    }

    represent()
    {
        var best_schedule_ = 0;
        console.log("Generation: " + this.gen);
        for(var value = 0; value < this.teachersSchedulesArray.length; value++){
            /* This is the representation for the old version of the genetic algorithm (prior to classes listing teachers & rooms) */

            //  this.schedule = this.teachersSchedulesArray[value].schedule;

            
            
            for(var period = 0; period < this.schedule.length; period++){
                // For an entire period
                console.log("Period " + (period+1));
                for(var i = 0; i < this.schedule[period].length ; i++){
                    // For each room


                    //console.log(this.schedule[period][i].room_teacher.toString().length)
                    if (this.schedule[period][i].room_teacher.toString().length < 14){
                    console.log("Room: " + this.schedule[period][i].room_number +
                        " \tTeacher: " + this.schedule[period][i].room_teacher +
                        " \t\tClass: " + this.schedule[period][i].room_class);
                    }
                    else
                    {
                        console.log("Room: " + this.schedule[period][i].room_number +
                        " \tTeacher: " + this.schedule[period][i].room_teacher +
                        " \tClass: " + this.schedule[period][i].room_class);
                    }
                }
                console.log();
            }

            // if(this.teachersSchedulesArray[value].percent > best_schedule_percent){
            //     best_schedule_percent = this.teachersSchedulesArray[value].percent;
            // }
            console.log("Fitness %: " + fitness(this.teachersSchedulesArray[value]) /*this.workingClass.fitness(this.schedule)*/ + "\n");

        }
        //console.log("Best Fitness for this schedule: " + best_schedule_percent);
    }
}

module.exports.GeneticRepresentation = GeneticRepresentation;