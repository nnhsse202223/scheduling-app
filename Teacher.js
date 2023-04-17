class Teacher
{
    //constructor
    constructor (name)
    {
        this.name = name;
        this.classPeriodList = [1,2,3,4,5,6,7,8];
    }

    
    //get functions
    get teacher_name()
    {
        return this.name;
    }
    
    classPeriod()
    {
        return this.classPeriodList;
    }

    take(index)
    {
        this.classPeriodList.splice(index, 1);
    }

    reset()
    {
        this.classPeriodList = [1,2,3,4,5,6,7,8];
    }


    toString()
    {
        return this.name;
    }

}

module.exports.Teacher = Teacher;