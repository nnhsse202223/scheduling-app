class Classes
{
    //constructor
    constructor (name)
    {
        this.name = name;
        //this.type = type;
        //JSON.stringify(this.type);
    }
    
    
    //get functions
    get class_name()
    {
        return this.name;
    }

    

    toString()
    {
        return this.name;
    }
}

module.exports.Classes = Classes;