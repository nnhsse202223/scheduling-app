class Room
{
    //constructor
    constructor (type, room_no)
    {
        this.type = type;
        this.room_no = room_no;

    }


    //get functions
    get room_type()
    {
        return this.type;
    }

    get room_number()
    {
        return this.room_no;
    }
}

module.exports.Room = Room;