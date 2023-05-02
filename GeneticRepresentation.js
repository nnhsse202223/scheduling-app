/* Genetic Represenation of the best children from this generation
    (and best parent)
        This includes the Teacher, Room, & Class classes
*/

// NEW!
// 2d array, X is room numbers, Y is period
// within each array value another array is held that states the teacher and class

class GeneticRepresentation
{
    // the parameter 'schedules' is given by ... (workingclass multiversearray currently) (theObj.verse?) (theActualVerse?)
    constructor(schedules)
    {
        this.teachersSchedulesArray = schedules.theMultiverseArray;     //double check what theMultiverseArray does
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
            console.log("Schedule " + value);
            this.schedule = this.teachersSchedulesArray[value].schedule;
            this.periodSortedClasses = [[],[],[],[],[],[],[],[]];


            // Sort each class into the period order
            for(var course = 0; course < this.schedule.length; course++){
                this.periodSortedClasses[this.schedule[course].get_classPeriod - 1].push(this.schedule[course]);
            }
            // console.log(this.periodSortedClasses.length + "\n");
            // console.log(this.periodSortedClasses[0].length);
            // console.log(this.periodSortedClasses[1].length);
            // console.log(this.periodSortedClasses[2].length);
            // console.log(this.periodSortedClasses[3].length);
            // console.log(this.periodSortedClasses[4].length);
            // console.log(this.periodSortedClasses[5].length);
            // console.log(this.periodSortedClasses[6].length);
            // console.log(this.periodSortedClasses[7].length);    // always 0

            // for all periods
            for(var period = 0; period < 8; period++){
                console.log("Period " + (period + 1));
                // For all classes within the period
                for(var i = 0; i < this.periodSortedClasses[period].length; i++){
                    this.class = this.periodSortedClasses[period][i]
                    if(this.class.get_class_teacher.toString().length < 15){
                        console.log("Room: " + this.class.get_class_room +
                            "\tTeacher: " + this.class.get_class_teacher +
                            "\t\tClass: " + this.class.get_class_name);
                    }
                    else{
                        console.log("Room: " + this.class.get_class_room +
                            "\tTeacher: " + this.class.get_class_teacher +
                            "\tClass: " + this.class.get_class_name);

                    }
                }
                console.log();
            }

            // if(this.teachersSchedulesArray[value].percent > best_schedule_percent){
            //     best_schedule_percent = this.teachersSchedulesArray[value].percent;
            // }
            console.log("Fitness %: " + this.teachersSchedulesArray[value].percent /*this.workingClass.fitness(this.schedule)*/ + "\n");

        //console.log("Best Fitness for this schedule: " + best_schedule_percent);
        }
    }
}
module.exports.GeneticRepresentation = GeneticRepresentation;