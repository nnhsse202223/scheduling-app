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
        this.dup_class_array;

        this.block;

        this.initialGeneration();
    }


    printer(array_thing)
    {
        for (let i = 0; i < array_thing.length; i++)
        {
            console.log("Period " + (i+1) + ": " + array_thing[i]);
            console.log(" ");
        }
    }


    /*
        Make a random initial generation
        Add code to get rid of impossible cases: Schmit teaching agriculture (comparing class type to teacher type)
    */
    initialGeneration()
    {
        
        this.dup_class_array = this.classArray.slice();
        console.log(this.dup_class_array);

        for (let j = 0; j < 8; j++)
        {
            for (let i = 0, k = 0; i < this.roomArray.length, k < this.dup_class_array.length; i++, k++)
            {
                if (i <= 2)
                {
                    this.roomArray[i].room_teach(this.teacherArray[i]);
                }
                console.log(this.dup_class_array[3* j + i]);
                this.roomArray[i].room_classy(this.dup_class_array[k]);
                //console.log(j);

                this.myClassPeriodArray.push(this.roomArray[i]);
            }
            

            this.scheduleArray.push( this.myClassPeriodArray );

            this.myClassPeriodArray = [];
        }

        /*
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
        */
        
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
            /*if (array_moment[0][i].room_type === array_moment[0][i].room_teacher.teacher_type)
            {
                this.fitness_value++;
            }
            this.maxfitness++;
            */
           
            //if (array_moment[0][i].room_type === (array_moment[0][i].room_class.class_type))
            {
            //    this.fitness_value++;
            }
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
