class Teacher
{
    //constructor
    constructor (name, type)
    {
        this.name = name;
        this.type = type;
    }

    
    //get functions
    get teacher_name()
    {
        return this.name;
    }

    get teacher_type()
    {
        return this.type;
    }
}