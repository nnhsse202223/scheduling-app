class Schedule
{
    constructor(array, percentage)
    {
        this.scheduleArray = array;
        this.percentage = percentage;
    }

    get schedule()
    {
        return this.scheduleArray;
    }

    set_schedule(array)
    {
        this.scheduleArray = array;
    }

    set_percentage(new_percentage){
        this.percentage = new_percentage;
    }

    get percent()
    {
        return this.percentage;
    }
    
    toString()
    {
        var stringer = "";
        for (let i = 0; i < this.scheduleArray.length; i++)
        {
            for (let j  = 0; j < this.scheduleArray[i].length; j++)
            {
                stringer += ("Period " + (i+1) + ": Room: " + this.scheduleArray[i][j].room_number + ", Teacher: "+ this.scheduleArray[i][j].room_teacher +", Class: " +this.scheduleArray[i][j].room_class + " ");
                //console.log("");                                                                                                                                    ");
            }
            //stringer+=("\n\n========================================\n========================================\n\n");                                                                                                                                                        ");
        }
        return stringer;
    }
}

module.exports.Schedule = Schedule;