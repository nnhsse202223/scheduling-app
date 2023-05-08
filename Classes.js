class Classes
{
    //constructor
    constructor (name, possibleTeachersInput, possibleRoomsInput, possiblePeriodsInput)
    {
        this.name = name;
        this.teacher;
        this.room;
        this.classPeriod;

        this.possibleTeachers = [];
        this.possibleTeachers = possibleTeachersInput;
        this.possibleRooms = [];
        this.possibleRooms = possibleRoomsInput;
        this.possiblePeriods = [];
        this.possiblePeriods = possiblePeriodsInput;
    }
     
    //get functions
    get get_class_name()
    {
        return this.name;
    }

    get get_class_teacher(){
        return this.teacher;
    }

    get get_class_room(){
        return this.room;
    }
    
    get get_possibleRooms(){
        return this.possibleRooms;
    }

    get get_possibleTeachers(){
        return this.possibleTeachers;
    }

    get get_possiblePeriods()
    {
        return this.possiblePeriods;
    }

    get get_classPeriod()
    {
        return this.classPeriod;
    }

    set_class_teacher(teach)
    {
        this.teacher = teach;
    }

    set_class_room(roomy)
    {
        this.room = roomy;
    }
    
    set_classPeriod(period)
    {
        this.classPeriod = period;
    }
    
    
    toString()
    {
        return this.name;
    }
}

module.exports.Classes = Classes;