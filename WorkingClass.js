class WorkingClass
{
    constructor (roomArray, teacherArray, classArray)
    {
        this.roomArray = roomArray;
        this.teacherArray = teacherArray;
        this.classArray = classArray;
        this.scheduleArray;
        this.fitness_value = 0;

        this.block1;
        this.block2;
        this.block3;

        this.randomMutate();
    }


    randomMutate()
    {
        this.block1 = [this.roomArray[0], this.teacherArray[0], this.classArray[0]];
        this.block2 = [this.roomArray[1], this.teacherArray[1], this.classArray[1]];
        this.block3 = [this.roomArray[2], this.teacherArray[2], this.classArray[2]];
        this.scheduleArray = [this.block1, this.block2, this.block3];
        console.log(this.scheduleArray);
    }

    fitness(array_moment)
    {
        if (array_moment[0].room_type == array_moment[0].teacher_type)
        {
            this.fitness_value++;
        }
        if (array_moment[0].room_type == array_moment[0].class_type)
        {
            this.fitness_value++;
        }

        return this.fitness_value;
        //return 5;
    }
}

module.exports.WorkingClass = WorkingClass;
