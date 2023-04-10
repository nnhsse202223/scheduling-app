class Room 
{
    //constructor
    constructor (room_no)
    {
        this.room_no = room_no;
    }

    //get functions
    get room_number()
    {
        return this.room_no;
    }


    toString()
    {
        return "    Room " + this.room_no + ":  Teacher: " + this.room_teacher + "  Class: " + this.room_class;
    }
}

module.exports.Room = Room;