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
        this.teachersSchedulesArray = schedules;
    }
    
    updateSchedules(schedules)
    {
        this.teachersSchedulesArray = schedules;
    }

    represent()
    {
        console.log("Generation: " + this.teachersSchedulesArray[0]);
        for(var value = 1; value < this.teachersSchedulesArray.length; value++){
            this.schedule = this.teachersSchedulesArray[value].schedule;
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
            // console.log(this.teachersSchedulesArray[value]);
            console.log("Fitness %: " + this.teachersSchedulesArray[value].percent /*this.workingClass.fitness(this.schedule)*/ + "\n");
        }
    }
}

module.exports.GeneticRepresentation = GeneticRepresentation;