class WorkingClass
{
    constructor (roomArray, teacherArray, classArray)
    {
        this.roomArray = roomArray;
        this.teacherArray = teacherArray;
        this.classArray = classArray;
        this.scheduleArray;
        this.fitness_value;

        this.block1;
        this.block2;
        this.blcok3;
    }


    randomMutate()
    {
        block1 = [roomArray[0], teacherArray[0], classArray[0]];
        block2 = [roomArray[1], teacherArray[1], classArray[1]];
        block3 = [roomArray[2], teacherArray[2], classArray[2]];
        this.scheduleArray = [block1, block2, block3];
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

        return fitness_value;
    }
}

exports.WorkingClass = WorkingClass;