class Teacher
{
    //constructor
    constructor (name, classLogArray)
    {
        this.name = name;
        this.classLog = classLogArray;
        //JSON.stringify(this.type);
    }

    
    //get functions
    get teacher_name()
    {
        return this.name;
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