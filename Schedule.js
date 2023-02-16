class Schedule
{
    constructor(array)
    {
        this.scheduleArray = array;
        this.percentage = 0;
    }

    get schedule()
    {
        return this.scheduleArray;
    }

    set_schedule(array)
    {
        this.scheduleArray = array;
    }

    set_percentage(percentage)
    {
        this.percentage = percentage;
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