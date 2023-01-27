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

        this.block;

        this.initialGeneration();
    }


    printer(array_thing)
    {
        for (let i = 0; i < array_thing.length; i++)
        {
            console.log("Period " + (i+1) + ": " + array_thing[i]);
        }
    }


    /*
        Make a random initial generation
    */
    initialGeneration()
    {
        for (let i = 0; i < this.roomArray.length; i++)
        {
            for (let j = 0; j < this.classArray.length/3; j++)
                {
                    this.block = [this.roomArray[j], this.teacherArray[j], this.classArray[3*j + i]];
                    this.myClassPeriodArray.push(this.block);
                }
            this.scheduleArray.push(this.myClassPeriodArray);
            this.myClassPeriodArray = [];
        }
        
        this.printer(this.scheduleArray);

        //for (let i = 0; i < this.scheduleArray.length; i++)
        {
            //console.log(this.scheduleArray[i]);
        }
    }

    


    /*
        Checks if the rooms, teachers, and classes class_type matches and adds to the fitness value if it does.
        The higher the fitness value, the better
    */
    fitness(array_moment)
    {
        for(let i = 0; i < array_moment[0].length; i++)
        {
            if (array_moment[0][i][0].room_type === array_moment[0][i][1].teacher_type)
            {
                this.fitness_value++;
            }
            this.maxfitness++;

            if (array_moment[0][i][0].room_type === (array_moment[0][i][2].class_type))
            {
                this.fitness_value++;
            }
            this.maxfitness++;

        }
        //console.log("Room length: " + this.roomArray.length);
        //console.log("Class length: " + this.classArray.length/3);
        console.log("This is the percent that the fitness that is oogly=b00gly: " + (100* this.fitness_value/this.maxfitness) + "%");
        console.log("Maximum fitness: " + this.maxfitness);
        console.log("Below is the fitness value:")
        return this.fitness_value;
        //return 5;
    }

}

module.exports.WorkingClass = WorkingClass;
