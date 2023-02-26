class Teacher
{
    //constructor
    constructor (name, type, classLogArray)
    {
        this.name = name;
        this.type = type;
        this.classLog = classLogArray;
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

    get classList()
    {
        return this.classLog;
    }

    toString()
    {
        return this.name;
    }

}

module.exports.Teacher = Teacher;