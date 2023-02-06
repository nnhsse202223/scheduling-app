const {Schedule} = require("./Schedule.js");

class WorkingClass
{
    constructor (roomArray, teacherArray, classArray)
    {
        this.roomArray = roomArray;
        this.teacherArray = teacherArray;
        this.classArray = classArray;
        this.myClassPeriodArray = [];
        this.scheduleArray = [];
        this.multiverseArray = [];
        this.fitness_value = 0;
        this.maxfitness = 0;
        this.mySchedule = new Schedule();
        this.dupClassArray = this.classArray.slice();
        this.dupTeacherArray = this.teacherArray.slice();
        this.randomTeacherIndex;
        this.randomClassIndex;

        this.block;

        for (let i = 0; i < 2; i++)
        {
            //console.log(this.initialGeneration());
            this.multiverseArray.push(this.initialGeneration());
        }
        
    }

    /*
        Creates a random integer value between min and max, inclusive of both
        @param min the minimum value
        @param max the maximum value
    */
    rand(min, max) 
    {
        return Math.round(Math.random() * (max - min) + min);
    }


    /*
        Makes a random initial generation
        Add code to get rid of impossible cases: Schmit teaching agriculture (comparing class type to teacher type)
    */
    initialGeneration()
    {
        for (let j = 0; j < 8; j++)
        {
            if (this.dupClassArray.length < this.roomArray.length)
            {
                this.dupClassArray = this.classArray.slice();
            }
            
            if (this.dupTeacherArray.length < this.roomArray.length)
            {
                this.dupTeacherArray = this.teacherArray.slice();
            }
            
            for (let i = 0; i < this.roomArray.length; i++)
            {
 
            this.randomTeacherIndex = this.rand(0, this.dupTeacherArray.length - 1);
                this.randomClassIndex = this.rand(0, this.dupClassArray.length - 1);

                this.roomArray[i].set_room_teacher(this.dupTeacherArray[this.randomTeacherIndex]);
                this.dupTeacherArray.splice(this.randomTeacherIndex,1);

                this.roomArray[i].set_room_class(this.dupClassArray[this.randomClassIndex]);
                this.dupClassArray.splice(this.randomClassIndex, 1);


                this.myClassPeriodArray.push (this.roomArray[i]);

                //NOTE: KEEP THE LINE BELOW, THIS IS USED TO VIEW THE SCHEDULE!!!!!
                console.log("Period " + (j+1) + ": Room: " + this.myClassPeriodArray[i].room_number + ", Teacher: "+ this.myClassPeriodArray[i].room_teacher +", Class: " +this.myClassPeriodArray[i].room_class);
            }

            //NOTE: KEEP FOR ORGANIZATION
            console.log(" ******** ");
            
            this.scheduleArray.push( this.myClassPeriodArray );

            this.myClassPeriodArray = [];

            

            //console.log(this.scheduleArray[j]); Backup printing method to display schedule
        }

        this.mySchedule.set_schedule(this.scheduleArray);

        this.scheduleArray = [];

        console.log("\n\n========================================\n========================================\n\n");
        return this.mySchedule;
    }

    


    /*
        Checks if the rooms, teachers, and classes class_type matches and adds to the fitness value if it does.
        The higher the fitness value, the better

        @param array_moment takes in a array to iterate through
    */
    fitness(array_moment)
    {
        this.fitness_value = 0;
        this.maxfitness = 0;
        for (let j = 0; j < array_moment.length; j++)
        {
            for(let i = 0; i < array_moment[j].length; i++)
            {
                //console.log(array_moment[j][i].room_type);
                //console.log(array_moment[j][i].room_teacher.teacher_type);
                if (array_moment[j][i].room_type === array_moment[j][i].room_teacher.teacher_type)
                {
                    this.fitness_value++;
                }
                this.maxfitness++;

                //if (array_moment[0][i].room_type === (array_moment[j][i].room_class.class_type))
                {
                    //this.fitness_value++;
                }
                //this.maxfitness++;

            }
        }
        //console.log("Room length: " + this.roomArray.length);
        //console.log("Class length: " + this.classArray.length/3);
        //console.log( array_moment[0][0].room_type );
        //console.log ( array_moment[0][0].room_teacher.teacher_type );
        //console.log("This is the percent that the fitness that is oogly=b00gly: " + (100* this.fitness_value/this.maxfitness) + "%");
        //console.log("Maximum fitness: " + this.maxfitness);
        //console.log("Below is the fitness value:")
        return this.fitness_value;
    }

}

module.exports.WorkingClass = WorkingClass;
