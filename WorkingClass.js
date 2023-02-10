const { Room } = require("./room.js");
const {Schedule} = require("./Schedule.js");

class WorkingClass
{
    constructor (roomArray, teacherArray, classArray)
    {
        //this should all be self explanatory
        this.roomArray = roomArray;
        this.teacherArray = teacherArray;
        this.classArray = classArray;
        //this.myClassPeriodArray = [];
        //this.scheduleArray = [];
        this.multiverseArray = [];
        this.fitness_value = 0;
        this.maxfitness = 0;
        //this.dupTeacherArray = this.teacherArray.slice();
        //this.randomTeacherIndex;
        //this.randomClassIndex;

        //this is to let us know what schedules are which, it is only for organization.
        this.scheduleNo = 1;

        //not sure if I am using this
        this.block;

        //this piece of code runs the generation a certain number of times and then puts them in the multiverse array
        console.log(this.multiverseArray);
        for (let i = 0; i < 10; i++)
        {
            //this.multiverseArray.push(this.initialGeneration());
            var mySchedule = this.initialGeneration();
            //console.log(mySchedule.toString());
            //if (i > 0){console.log(this.multiverseArray[0].schedule[0]);}
            this.multiverseArray.push(mySchedule);
            //console.log(this.multiverseArray[0].schedule[0]);
            //console.log(this.multiverseArray);
        }
        
        //console.log(this.multiverseArray[0].schedule[0]);
        //console.log(" ");
        //console.log(this.multiverseArray[1].schedule[0]);

    }

    rand(min, max) 
    {
        return Math.round(Math.random() * (max - min) + min);
    }

    /*
        Makes a random initial generation
        HOW THIS WORKS:
        Our schedule is a 2D array of Room objects. These Rooms contain a type, a Teacher object, and a Classes (like what class is being taught) object. The Teacher and Class
            object also has a type. The type is either currently FACS, Business, and Tech. It then takes a random teacher and class from our database, and then assigns it to
            a new Room object. That room object then gets pushed into a myClassPeriodArray, which there is one for every period, of which there are 8. Then, the myClassPeriodArray
            gets pushed into the schedule array. The end result ends up being a 2D array. The schedule array is an array of arrays in which each contain Room object elements.
        Add code to get rid of impossible cases: Schmit teaching agriculture (comparing class type to teacher type)
    */
    initialGeneration()
    {
        var scheduleArray1 = [];
        var aSchedule = new Schedule([]);
        var dupClassArray = this.classArray.slice();
        var dupTeacherArray = this.teacherArray.slice();
        //var dupRoomArray = this.roomArray.slice();
        var randomClassIndex  = 0;
        var randomTeacherIndex = 0;
        var myClassPeriodArray = [];

        //just for organization (please tell me I can spell)
        console.log("Schedule number: " + this.scheduleNo);
        console.log("");
        this.scheduleNo++;

        for (let j = 0; j < 8; j++)
        {
            var dupRoomArray = this.roomArray.slice();

            //Not enough classes to fil all rooms
            if (dupClassArray.length < dupRoomArray.length)
            {
                dupClassArray = this.classArray.slice();
            }

            //Not enough teachers to fill all rooms
            if (dupTeacherArray.length < dupRoomArray.length)
            {
                dupTeacherArray = this.teacherArray.slice();
            }
            
            for (let i = 0; i < this.roomArray.length; i++)
            {
                randomTeacherIndex = this.rand(0, dupTeacherArray.length - 1);
                randomClassIndex = this.rand(0, dupClassArray.length - 1);
                var THE_OTHER_ROOM = dupRoomArray.pop();
                var theRoom = new Room(THE_OTHER_ROOM.room_number, THE_OTHER_ROOM.room_type);

                theRoom.set_room_teacher(dupTeacherArray[randomTeacherIndex])
                //dupRoomArray[i].set_room_teacher();
                dupTeacherArray.splice(randomTeacherIndex,1);

                theRoom.set_room_class(dupClassArray[randomClassIndex]);
                //dupRoomArray[i].set_room_class(dupClassArray[randomClassIndex]);
                dupClassArray.splice(randomClassIndex, 1);

                //myClassPeriodArray  = dupRoomArray.slice();
                myClassPeriodArray.push(theRoom);

                //NOTE: KEEP THE LINE BELOW, THIS IS USED TO VIEW THE SCHEDULE!!!!!
                console.log("Period " + (j+1) +
                    ": Room: " + myClassPeriodArray[i].room_number +
                    ", Teacher: "+ myClassPeriodArray[i].room_teacher +
                    ", Class: " +myClassPeriodArray[i].room_class);
            }

            //NOTE: KEEP FOR ORGANIZATION
            console.log(" ******** ");
            
            //console.log(myClassPeriodArray[0]);
            //Investigate if slice makes a copy of an array w/o references
            var copyBecauseCodeDoesntWork = myClassPeriodArray.slice();
            scheduleArray1.push(copyBecauseCodeDoesntWork);

            myClassPeriodArray = [];
            copyBecauseCodeDoesntWork = [];
            //myClassPeriodArray.splice(0,myClassPeriodArray.length);


            //console.log(this.scheduleArray[j]); Backup printing method to display schedule

        }
        aSchedule.set_schedule(scheduleArray1);

        // scheduleArray1.length = 0;

        console.log("\n\n========================================\n========================================\n\n");

        return aSchedule;
    }


     /*
        Checks if the rooms, teachers, and classes class_type matches and adds to the fitness value if it does.
        The higher the fitness value, the better
        It also checks with the nax fitness, and gives it a percent value
        @param array_moment takes in a array to iterate through
        @return the fitness value
    */
    fitness(array_moment)
    {
        this.fitness_value = 0;
        this.maxfitness = 0;
        for (let j = 0; j < array_moment.length; j++)
        {
            for(let i = 0; i < array_moment[j].length; i++)
            {
                // console.log("Period: " + (j+1) + ", Room: " + array_moment[j][i].room_no);
                // console.log(array_moment[j][i].room_type);
                // console.log(array_moment[j][i].room_teacher.teacher_type);
                // console.log(array_moment[j][i].room_type === array_moment[j][i].room_teacher.teacher_type)
                // console.log("88888888888888888888888")
                if (array_moment[j][i].room_type === array_moment[j][i].room_teacher.teacher_type)
                {
                    this.fitness_value++;
                }
                this.maxfitness++;

                if (array_moment[0][i].room_type === (array_moment[j][i].room_class.class_type))
                {
                    this.fitness_value++;
                }
                this.maxfitness++;
    
                if (array_moment[j][i].room_teacher.teacher_type === array_moment[j][i].room_class.class_type)
                {
                    this.fitness_value++;
                }
                this.maxfitness++;
            }
            //console.log("lego my ego");
            //console.log(" ");
        }
        //console.log("Room length: " + this.roomArray.length);
        //console.log("Class length: " + this.classArray.length/3);
        //console.log( array_moment[0][0].room_type );
        //console.log ( array_moment[0][0].room_teacher.teacher_type );
        console.log("This is the current fitness percent: " + (100* this.fitness_value/this.maxfitness) + "%");
        console.log("Maximum fitness: " + this.maxfitness);
        console.log("Below is the fitness value:")
        return this.fitness_value;
        //BTW, the fitness value and maxfitness value isn't reset between runs, which i think causes unintended behavior
        //return 5;
    }
}

module.exports.WorkingClass = WorkingClass;