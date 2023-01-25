class WorkingClass
{
    constructor (roomArray, teacherArray, classArray)
    {
        this.roomArray = roomArray;
        this.teacherArray = teacherArray;
        this.classArray = classArray;
        this.myFirstPeriodArray;
        this.mySecondPeriodArray;
        this.myThirdPeriodArray;
        this.scheduleArray;
        this.fitness_value = 0;

        this.block1;
        this.block2;
        this.block3;
        this.block4;
        this.block5;
        this.block6;
        this.block7;
        this.block8;
        this.block9;

        this.randomMutate();
    }


    randomMutate()
    {
        this.block1 = [this.roomArray[0], this.teacherArray[0], this.classArray[0]];
        this.block2 = [this.roomArray[1], this.teacherArray[1], this.classArray[1]];
        this.block3 = [this.roomArray[2], this.teacherArray[2], this.classArray[2]];
        this.block4 = [this.roomArray[0], this.teacherArray[0], this.classArray[3]];
        this.block5 = [this.roomArray[1], this.teacherArray[1], this.classArray[4]];
        this.block6 = [this.roomArray[2], this.teacherArray[2], this.classArray[5]];
        this.block7 = [this.roomArray[0], this.teacherArray[0], this.classArray[6]];
        this.block8 = [this.roomArray[1], this.teacherArray[1], this.classArray[7]];
        this.block9 = [this.roomArray[2], this.teacherArray[2], this.classArray[8]];

        this.myFirstPeriodArray = [this.block1, this.block2, this.block3];
        this.mySecondPeriodArray = [this.block4, this.block5, this.block6];
        this.myThirdPeriodArray = [this.block7, this.block8, this.block9];

        this.scheduleArray = [this.myFirstPeriodArray, this.mySecondPeriodArray, this.myThirdPeriodArray];
        console.log(this.scheduleArray);
    }

    fitness(array_moment)
    {
        if (array_moment[0][0][0].room_type === array_moment[0][0][1].teacher_type)
        {
            this.fitness_value++;
        }
        if (array_moment[0][0][0].room_type === (array_moment[0][0][2].class_type))
        {
            this.fitness_value++;
        }

        return this.fitness_value;
        //return 5;
    }
}

module.exports.WorkingClass = WorkingClass;
