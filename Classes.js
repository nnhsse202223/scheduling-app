class Classes
{
    //constructor
    constructor (name, possibleTeachersInput, possibleRoomsInput)
    {
        this.name = name;
        this.teacher;
        this.room;
        this.classPeriod;

        this.possibleTeachers = [];
        this.possibleTeachers = teacherListInput;
        this.possibleRooms = [];
        this.possibleRooms = possibleRoomsInput;
    }
     
    //get functions
    get class_name()
    {
        return this.name;
    }

    get class_teacher(){
        return this.teacher;
    }

    get class_room(){
        return this.room;
    }
    
    get possibleRooms(){
        return this.possibleRooms;
    }

    get possibleTeachers(){
        return this.possibleTeachers;
    }

    set_class_teacher()


    
    
    
    
    
    
    toString()
    {
        return this.name;
    }
}

module.exports.Classes = Classes;