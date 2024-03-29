class Teacher
{
    //constructor
    constructor (name)
    {
        this.name = name;
        this.classPeriodList = [1,2,3,4,5,6,7,8];
        this.otherROOOMList = [0,0,0,0,0,0,0,0];
        this.weight = 0;
        this.percent = 100;
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

    get class_room()
    {
        return this.otherROOOMList;
    }

    get weights()
    {
        return this.weight;
    }

    set_weight(mass)
    {
        this.weight = mass;
    }

    set_percentage(new_percent){
        this.percent = new_percent;
    }

    fill_class(index_of_class_to_fill,class_name) // adds a class to a teachers' schedule: basically if they have a number that period is free, if they have a 0 in that slot they have a class. 
    {
        this.classPeriodList[index_of_class_to_fill] = class_name;    
    }

    fill_room(index, roomNo)
    {
        this.otherROOOMList[index] = roomNo;
    }

    addLunch()
    {
        this.classPeriodList[Math.trunc(Math.random() * (6 - 4) + 4)]  = "Lunch";
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