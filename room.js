class Room 
{
    //constructor
    constructor (room_no)
    {
        this.room_no = room_no;
        this.roomClassPeriodList = [1,2,3,4,5,6,7,8];
    }

    //get functions
    get room_number()
    {
        return this.room_no;
    }

    get room_ClassPeriod()
    {
        return this.roomClassPeriodList;
    }

    set_roomClassPeriod(input)
    {
        this.roomClassPeriodList = input;
    }

    reset()
    {
        this.roomClassPeriodList = [1,2,3,4,5,6,7,8];
    }


    toString()
    {
        return "    Room " + this.room_no;
    }
}

module.exports.Room = Room;