class Teacher
{
    //constructor
    constructor (name, type)
    {
        this.name = name;
        this.type = type;
        //JSON.stringify(this.type);
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

    toString()
    {
        return this.name;
    }

}

module.exports.Teacher = Teacher;