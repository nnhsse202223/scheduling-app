class classPeriod 
{
    constructor()
    {
        this.array1 = [];
        this.array2 = [];
        this.array3 = [];
        this.array4 = [];
        this.thing1 = Object("thing1");
        this.thing2 = Object("thing2");
        this.thing3 = Object("thing3");
        this.thing4 = Object("thing4");
        this.thing5 = Object("thing5");
        this.thing6 = Object("thing6");
        this.thing7 = Object("thing7");
        this.thing8 = Object("thing8");
        this.thing9 = Object("thing9");
        this.array2.push(this.thing1, this.thing2, this.thing3);
        this.array3.push(this.thing4, this.thing5, this.thing6);
        this.array4.push(this.thing7, this.thing8, this.thing9);
        this.array1.push(this.array2, this.array3, this.array4);
        
    }

    printer(array_thing)
    {
        for (let i = 0; i < array_thing.length; i++)
        {
            console.log("Period " + (i+1) + ": " + array_thing[i]);
        }
    }
    
}

testObj = new classPeriod();
testObj.printer(testObj.array1);