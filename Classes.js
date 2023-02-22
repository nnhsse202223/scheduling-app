class Classes
{
    //constructor
    constructor (name, type)
    {
        this.name = name;
        this.type = type;
        //JSON.stringify(this.type);
    }
    
    
    //get functions
    get class_name()
    {
        return this.name;
    }

    get class_type()
    {
        return this.type;
    }

    toString()
    {
        return this.name;
    }
}

module.exports.Classes = Classes;