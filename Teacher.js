class Teacher
{
    //constructor
    constructor (name)
    {
        this.name = name;
        this.classPeriodList = [1,2,3,4,5,6,7,8];
        this.otherROOOMList = [];
    }

    //NOTE: ADD 2 seperate arrays, one that contains room numbers with period as the index+1, and one with classes. 
    //store teach ers????


    //get functions
    get teacher_name()
    {
        return this.name;
    }
    
    get classPeriod()
    {
        return this.classPeriodList;
    }

    fill_class(index_of_class_to_fill) // adds a class to a teachers' schedule: basically if they have a number that period is free, if they have a 0 in that slot they have a class. 
    {
        this.classPeriodList[index_of_class_to_fill] = 0;    
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