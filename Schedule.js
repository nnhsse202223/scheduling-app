class Schedule
{
    constructor(array)
    {
        this.scheduleArray = array;
    }

    get schedule()
    {
        return this.scheduleArray;
    }

    set_schedule(array)
    {
        this.scheduleArray = array;
    }
}

module.exports.Schedule = Schedule;