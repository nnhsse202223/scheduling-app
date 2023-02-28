class Room 
{
    //constructor
    constructor (room_no, classLogArray)
    {
        this.room_no = room_no;
        this.classLog = classLogArray;
        this.teacher;
        this.class;
        //JSON.stringify(this.type)
    }

    //get functions

    get room_number()
    {
        return this.room_no;
    }

    get room_teacher()
    {
        return this.teacher;
    }

    get room_class()
    {
        return this.class;
    }

    get classList()
    {
        return this.classLog;
    }

    set_room_teacher(new_teacher)
    {
        this.teacher = new_teacher;
    }

    set_room_class(new_class)
    {
        this.class = new_class;
    }

    toString()
    {
        return "    Room " + this.room_no + ":  Teacher: " + this.room_teacher + "  Class: " + this.room_class;
    }
}

module.exports.Room = Room;