class Room 
{
    //constructor
    constructor (room_no, type)
    {
        this.room_no = room_no;
        this.type = type;
        this.teacher;
        this.classer;
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

    get room_teacher()
    {
        return this.teacher;
    }

    get room_class()
    {
        return this.classer;
    }

    set room_teach(teach)
    {
        this.teacher = teach;
    }

    set room_classy(clash)
    {
        this.classer = clash;
    }

}

module.exports.Room = Room;