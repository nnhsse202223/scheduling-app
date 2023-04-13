class Teacher
{
    //constructor
    constructor (name)
    {
        this.name = name;
    }

    
    //get functions
    get teacher_name()
    {
        return this.name;
    }


    toString()
    {
        return this.name;
    }

}

module.exports.Teacher = Teacher;