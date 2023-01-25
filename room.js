class Room 
{
    //constructor
    constructor (room_no, type)
    {
        this.room_no = room_no;
        this.type = type;
        //JSON.stringify(this.type)
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