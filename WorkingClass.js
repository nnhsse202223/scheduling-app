class WorkingClass
{
    constructor (roomArray, teacherArray, classArray)
    {
        this.roomArray = roomArray;
        this.teacherArray = teacherArray;
        this.classArray = classArray;
        this.myClassPeriodArray = [];
        this.scheduleArray = [];
        this.fitness_value = 0;
        this.maxfitness = 0;
        this.dupClassArray;
        this.dupTeacherArray;
        this.randomTeacherIndex;
        this.randomClassIndex;

        this.block;

        this.initialGeneration();
    }

    rand(min, max) 
    {
        return Math.round(Math.random() * (max - min) + min);
    }

    printer(array_thing)
    {
        for (let i = 0; i < array_thing.length; i++)
        {
            console.log("Period " + (i+1) + ": " + array_thing[i]);
            console.log(" ");
        }
    }

    getscheduleArray()
    {
        return this.scheduleArray;
    }


    /*
        Make a random initial generation
        Add code to get rid of impossible cases: Schmit teaching agriculture (comparing class type to teacher type)
    */
    initialGeneration()
    {
        for (let j = 0; j < 8; j++)
        {
            this.dupClassArray = this.classArray.slice();
            this.dupTeacherArray = this.teacherArray.slice();

            for (let i = 0; i < this.roomArray.length; i++){
                this.randomTeacherIndex = this.rand(0, this.dupTeacherArray.length - 1);
                this.randomClassIndex = this.rand(0, this.dupClassArray.length - 1);

                this.roomArray[i].room_teach(this.dupTeacherArray[this.randomTeacherIndex]);
                this.dupTeacherArray = this.dupTeacherArray.splice(this.randomTeacherIndex, 1);

                this.roomArray[i].room_classy(this.dupClassArray[this.randomClassIndex]);
                this.dupClassrArray = this.dupClassArray.splice(this.randomClassIndex, 1);

                this.myClassPeriodArray.push(this.roomArray[i]);
            }

        this.scheduleArray.push( this.myClassPeriodArray );

        this.myClassPeriodArray = [];
        }
        console.log(this.scheduleArray);
    }

    /*
        Checks if the rooms, teachers, and classes class_type matches and adds to the fitness value if it does.
        The higher the fitness value, the better
    */
    fitness(array_moment)
    {
        for(let i = 0; i < array_moment[0].length; i++)
        {
            /*if (array_moment[0][i].room_type === array_moment[0][i].room_teacher.teacher_type)
            {
                this.fitness_value++;
            }
            this.maxfitness++;
            */
           
            /*if (array_moment[0][i].room_type === (array_moment[0][i].room_class.class_type))
            {
                this.fitness_value++;
            }*/
            this.maxfitness++;

        }
        //console.log("Room length: " + this.roomArray.length);
        //console.log("Class length: " + this.classArray.length/3);
        //console.log( array_moment[0][0].room_type );
        //console.log ( array_moment[0][0].room_teacher.teacher_type );
        console.log("This is the percent that the fitness that is oogly=b00gly: " + (100* this.fitness_value/this.maxfitness) + "%");
        console.log("Maximum fitness: " + this.maxfitness);
        console.log("Below is the fitness value:")
        return this.fitness_value;
        //return 5;
    }
}

module.exports.WorkingClass = WorkingClass;
