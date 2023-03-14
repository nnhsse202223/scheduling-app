const { Room } = require("./Room.js");
const {Schedule} = require("./Schedule.js");

//the number of schedules we want to generate
const INITIAL_GENERATION_SCHEDULE_NUMBER_OF_HOW_MANY_SCHEDULES_WE_WANT = 1;

class WorkingClass
{
    //easy stuff, right?
    constructor (roomArray, teacherArray, classArray)
    {
        this.roomArray = roomArray;
        this.teacherArray = teacherArray;
        this.classArray = classArray;
        this.multiverseArray = [];
        this.gen_number = 0;
        this.multiverseArray.push(this.gen_number);
        this.fitness_value = 0;
        this.maxfitness = 0;
        this.teacherPreferenceData = require('./teachers2.json');

        //this is to let us know what schedules are which, it is only for organization.
        this.scheduleNo = 1;

        //this piece of code runs the generation a certain number of times and then puts them in the multiverse array
        //console.log(this.multiverseArray);
        for (let i = 0; i < INITIAL_GENERATION_SCHEDULE_NUMBER_OF_HOW_MANY_SCHEDULES_WE_WANT; i++)
        {
            var mySchedule = this.initialGeneration();
            //console.log(mySchedule.toString());
            this.multiverseArray.push(mySchedule);
        }    
    }

    /*
        Creates a random integer value between min and max, inclusive of both

        @param min the minimum value
        @param max the maximum value
    */
    rand(min, max) 
    {
        return Math.round(Math.random() * (max - min) + min);
    }


    /*
        Makes a random initial generation
        HOW THIS WORKS:
        Our schedule is a 2D array of Room objects. These Rooms contain a type, a Teacher object, and a Classes (like what class is being taught) object. The Teacher and Class
            object also has a type. The type is either currently FACS, Business, Agriculture and Technology. It then takes a random teacher and class from our database, and then 
            assigns it to a new Room object. That room object then gets pushed into a myClassPeriodArray, which there is one for every period, of which there are 8. Then,
            the myClassPeriodArray gets pushed into the schedule array. The end result ends up being a 2D array. The schedule array is an array of arrays in which each contain 
            Room object elements.
        Add code to get rid of impossible cases: Schmit teaching agriculture (comparing class type to teacher type) THIS IS DONE
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
        // console.log("Schedule number: " + this.scheduleNo);
        // console.log("");
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
                var theRoom = new Room(THE_OTHER_ROOM.room_number, THE_OTHER_ROOM.classList);

                theRoom.set_room_teacher(dupTeacherArray[randomTeacherIndex])
                //dupRoomArray[i].set_room_teacher();
                dupTeacherArray.splice(randomTeacherIndex,1);
                
                theRoom.set_room_class(dupClassArray[randomClassIndex]);
                //dupRoomArray[i].set_room_class(dupClassArray[randomClassIndex]);
                dupClassArray.splice(randomClassIndex, 1);


                //myClassPeriodArray  = dupRoomArray.slice();
                myClassPeriodArray.push(theRoom);

                //NOTE: KEEP THE LINE BELOW, THIS IS USED TO VIEW THE SCHEDULE!!!!!
                //console.log("Period " + (j+1) + ": Room: " + myClassPeriodArray[i].room_number + ", Teacher: "+ myClassPeriodArray[i].room_teacher + ",  \t" + "Class: " + myClassPeriodArray[i].room_class);
            }
        
            //NOTE: KEEP FOR ORGANIZATION
            //console.log(" ******** ");

            var copyBecauseCodeDoesntWork = myClassPeriodArray.slice();
            scheduleArray1.push(copyBecauseCodeDoesntWork);

            myClassPeriodArray = [];
            copyBecauseCodeDoesntWork = [];
            //console.log(this.scheduleArray[j]); //Backup printing method to display schedule
        }

        aSchedule.set_schedule(scheduleArray1);
        this.fitness(aSchedule.schedule);
        aSchedule.set_percentage(this.fitness_value/this.maxfitness * 100);

        //NOTE: KEEP FOR ORGANIZATION
        //console.log("\n\n========================================\n========================================\n\n");
        return aSchedule;
    }

    


    /*
        Checks if the rooms, teachers, and classes class_type matches and adds to the fitness value if it does.
        The higher the fitness value, the better
        It also checks with the nax fitness, and gives it a percent value

        @param theSchedule takes in a array to iterate through
        @return the fitness value
    */
    fitness(theSchedule)
    {
        this.fitness_value = 0;
        this.maxfitness = 0;
        let negate = false;
        for (let j = 0; j < theSchedule.length; j++) //checks class period
        {
            for(let i = 0; i < theSchedule[j].length; i++) //rooms within each period
            {
                if(theSchedule[j][i].classList.includes(theSchedule[j][i].room_class.name))
                {
                    this.fitness_value += 10; //Technically unnesscary, given that we do not have room weights and we are negating fitness if the room is wrong
                }
                else
                {
                    negate = true;
                }
                if (theSchedule[j][i].room_teacher.classList.includes(theSchedule[j][i].room_class.name))
                {
                    this.teacherPreferenceData.forEach(fileData => {
                        if(fileData["Teacher"] == theSchedule[j][i].room_teacher) {
                            this.fitness_value += +fileData[theSchedule[j][i].room_class.name.replaceAll(' ', '')];
                    }});
                }
                else
                {
                    negate = true;
                }
                this.maxfitness += 20; //10 for rooms and 10 for classes
            }
        }
        if(negate)
        {
            this.fitness_value -= this.maxfitness;
        }
        this.fitness_value /= this.maxfitness;
        return this.fitness_value;
    }



    /* 
        Take in array of schedules, mutates it, and creates a new schedule

        @param multiverse the schedule array that needs to be regenerated
    */
    regenerate(multiverse)
    {
        for(let i = 0; i < multiverse.length; i++)
        {
            var omniverse = [];
            omniverse.push(++this.gen_number);
            var schedules = multiverse.pop();

            //put mutator method here
            //mutator mutator mutator
            //blah blah blah
            //more mutator
            //la la la la la
            //i love mutator methods
            //aaaaaaaaaaaaaaaaand we're done 
            
            var blank = new Schedule(schedules.schedule, schedules.percentage);
            omniverse.push(blank);
        } 
        this.multiverseArray = [];
        this.multiverseArray = omniverse.slice();

        return omniverse;
    }

    //does all the mutations if we want it to
    mutate(theSchedule)
    {
        
    }

    //Adds more randomly generated schedules to the multiverse array
    addition(multiverseSchedule)
    {

    }

    //Deletes bad schedules from multiverse array
    eaglePurge(multiverseSchedule) 
    {
        for(let i = 0; i < multiverseSchedule.length; i++){
            console.log(multiverseSchedule[i].percentage);
        }
        
        //for eeeur ascheedl in the mutlvoerse, call therodsfold
        //with the threshold negative, PURGE!!!!
    }

    // Regenerates a certain part of a schedule. 
    line_change(theSchedule)
    {

    }

    //crosses two different schedules.
    crossover(theSchedule)
    {

    }

    //Checks if changes made to individual schedules from line_change or crossover were better or worse than just leaving it alone. 
    mutateChecker(theSchedule, theNewSchedule)
    {

    }


    /*
        Checks the threshold value of different types of functions. The parameters tells us what type to check.
        If we want to check the threshold to add a schedule, the type is 'add'.
        If we want to check the threshold for removing a schedule, the type is 'subtract'.
        If we want to check the threshold to stop looking for a schedule, the type is 'end'.

        @param type the type of threshold being checked
    */
    threshold(type)
    {
        if (type == "add")
        {
            return 10; //change to algorithm
        }

        if (type == "subtract")
        {
            return 10; //change to algorithm
        }

        if (type == "end")
        {
            return 97.5; //change to algorithm
        }
    }

}
module.exports.WorkingClass = WorkingClass;
