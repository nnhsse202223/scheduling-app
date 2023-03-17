const { Room } = require("./room.js");
const {Schedule} = require("./Schedule.js");
const {Multiverse, Generation} = require("./Generation.js");

//the number of schedules we want to generate
const INITIAL_GENERATION_SCHEDULE_NUMBER_OF_HOW_MANY_SCHEDULES_WE_WANT = 10;

class WorkingClass
{
    constructor (roomArray, teacherArray, classArray)
    {
        this.roomArray = roomArray;
        this.teacherArray = teacherArray;
        this.classArray = classArray;
        this.multiverseArray = [];
        this.gen_number = 0;
        this.fitness_value = 0;
        this.maxfitness = 0;
        this.verse;
        var teacherPreferenceData = require('./teachers.json');

        //this is to let us know what schedules are which, it is only for organization.
        this.scheduleNo = 1;

        //this piece of code runs the generation a certain number of times and then puts them in the multiverse array

        for (let i = 0; i < INITIAL_GENERATION_SCHEDULE_NUMBER_OF_HOW_MANY_SCHEDULES_WE_WANT; i++)
        {
            var mySchedule = this.initialGeneration();
            this.multiverseArray.push(mySchedule);
        }    

        this.verse = new Generation(this.gen_number, this.multiverseArray);
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
        var randomClassIndex  = 0;
        var randomTeacherIndex = 0;
        var myClassPeriodArray = [];

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

            var copyBecauseCodeDoesntWork = myClassPeriodArray.slice();
            scheduleArray1.push(copyBecauseCodeDoesntWork);

            myClassPeriodArray = [];
            copyBecauseCodeDoesntWork = [];
            //console.log(this.scheduleArray[j]); //Backup printing method to display schedule
        }

        aSchedule.set_schedule(scheduleArray1);
        aSchedule.set_percentage(this.fitness(aSchedule.schedule));

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
        for (let j = 0; j < theSchedule.length; j++) //checks class period
        {
            for(let i = 0; i < theSchedule[j].length; i++) //rooms within each period
            {
                if (theSchedule[j][i].classList.includes(theSchedule[j][i].room_class.name))
                {
                    this.fitness_value++;
                }

                this.maxfitness++;
                
                if (theSchedule[j][i].room_teacher.classList.includes(theSchedule[j][i].room_class.name))
                {
                    this.fitness_value++;
                    
                }
                this.maxfitness++;
            }
        }

        return this.fitness_value/this.maxfitness * 100;
    }



    /* 
        Take in array of schedules, mutates it, and creates a new schedule

        @param multiverse the schedule array that needs to be regenerated
    */
    regenerate(multiverseObject)
    {
        multiverseObject.setGen(multiverseObject.genNo + 1);

        var omniverse = [];

        var multiver = [];

        for(let i = 0; i < multiverseObject.theMultiverseArray.length; i++)
        {
            var schedules = multiverseObject.theMultiverseArray[i];

            //Singular Schedule Mutators
            //la la la
            //mutate mutate
            //we do some mutations here
            //ehehehe
            //more mutations!!!!
            //yayayayayayayy
             
            
            var mutated_Schedules = new Schedule(schedules.schedule, schedules.percentage);
            omniverse.push(mutated_Schedules );
            
        } 

        //Multiverse Mutators
        // omniverse = this.eaglePurge(omniverse, multiverseObject.genNo);
        // if (multiverseObject.genNo > 2)
        // {
        //     this.addition(omniverse, multiverseObject.genNo);
        // }

        for (let i = 0; i < multiverseObject.genNo + 5; i++)
        {
            omniverse = this.crossover(omniverse);
        }
        

        //clear multiverseArray
        multiver = [];
        multiver = omniverse.slice();
        //console.log(multiver);

        var omnipresent = new Generation(multiverseObject.genNo, multiver);
        //console.log(omnipresent);
        //console.log(omnipresent);

        return omnipresent;
    }

    //does all the mutations if we want it to
    mutate(theSchedule)
    {
        
    }

    //Adds more randomly generated schedules to the multiverse array
    addition(multiverseInput, gen)
    {
        var missingSchedules = INITIAL_GENERATION_SCHEDULE_NUMBER_OF_HOW_MANY_SCHEDULES_WE_WANT - multiverseInput.length;

        while (missingSchedules > 0)
        {
            var potentialSchedule = this.initialGeneration();
            if (potentialSchedule.percentage > this.threshold("add", gen))
            {
                multiverseInput.push(potentialSchedule);
                missingSchedules--;
            }
        }
    }

    //Deletes bad schedules from multiverse array
    // It's called eagle purge cause in like Honors Bio there are like bugs on a rock and an eagle comes down and eats some (purge)

    //ADD RANDOMNESS FOR WHEN TO DELETE VS NOT
    eaglePurge(multiverseInput, gen) 
    {
        var goodSchedules = [];
        
        //Restricting the amount of deletions to to under a certain percent -->  .5 would enable eagle purge to delete up to half of all schedules in multiverseInput if the fitness vals are small
        // var percent_of_schedules_to_delete = .5; 
        
        // var maximum_number_of_schedules_to_delete = multiverseInput.length * percent_of_schedules_to_delete;

        // var deleted_schedules = 0;
        
        for(let i = 0; i < multiverseInput.length; i++){
            if(multiverseInput[i].percentage > this.threshold("subtract", gen))
            {
                goodSchedules.push(multiverseInput[i]);
            }
        }

        return goodSchedules;
    }

    //Takes two Room objects within a Schedule and randomly mutates them -> swapping when classes take place inside a day. 
    //vertical
    line_swap(theSchedule)
    {

    }

    //crosses two different schedules -> switching 1 class.
    //horizontal
    crossover(multiverseInput)
    {
        var multiverseInputCopy = [];
        
        for (let i = 0; i < multiverseInput.length; i++)
        {
            multiverseInputCopy.push(new Schedule(multiverseInput[i].schedule, multiverseInput[i].percentage));
        }
        
        //Generating a random class period to use -> values 0-7
        //var randPeriod = this.rand(0,7);
        var randPeriod = "0";

        // var firstRandomScheduleIndex = this.rand(0, multiverseInput.length - 1);   
        // var secondRandomScheduleIndex = this.rand(0, multiverseInput.length - 1);

        var firstRandomScheduleIndex = 1;
        var secondRandomScheduleIndex = 1;

        // while (secondRandomScheduleIndex == firstRandomScheduleIndex)
        // {
        //     secondRandomScheduleIndex = this.rand(0, multiverseInput.length - 1);
            
        // }        

        //Values 0-16
        var firstRandRoomIndex = 7;
        //var firstRandRoomIndex = this.rand(0, multiverseInput[firstRandomScheduleIndex].schedule[randPeriod].length - 1);
        // console.log("rand schedule: " + multiverseInputCopy[secondRandomScheduleIndex].schedule);
        //var secondRandRoomIndex = this.rand(0, (multiverseInputCopy[secondRandomScheduleIndex].schedule[randPeriod].length-1));     
        var secondRandRoomIndex = 13;

        
        // var secondRandRoomIndex = 5;
        
        //Accessing that random room
        var firstRoom = multiverseInputCopy[firstRandomScheduleIndex].schedule[randPeriod][firstRandRoomIndex];
        var secondRoom = multiverseInputCopy[secondRandomScheduleIndex].schedule[randPeriod][secondRandRoomIndex];  

        //Swapping classes
        multiverseInputCopy[firstRandomScheduleIndex].schedule[randPeriod][firstRandRoomIndex].set_room_teacher(secondRoom.room_teacher);
        multiverseInputCopy[firstRandomScheduleIndex].schedule[randPeriod][firstRandRoomIndex].set_room_class(secondRoom.room_class);

        multiverseInputCopy[secondRandomScheduleIndex].schedule[randPeriod][secondRandRoomIndex].set_room_teacher(firstRoom.room_teacher);
        multiverseInputCopy[secondRandomScheduleIndex].schedule[randPeriod][secondRandRoomIndex].set_room_class(firstRoom.room_class);
        
        //Updating fitness value of new potential classes
        multiverseInputCopy[firstRandomScheduleIndex].set_percentage(this.fitness(multiverseInputCopy[firstRandomScheduleIndex].schedule));
        multiverseInputCopy[secondRandomScheduleIndex].set_percentage(this.fitness(multiverseInputCopy[secondRandomScheduleIndex].schedule));

        //Checking the percentages such that if one schedule is improved we should keep that. 

        // if fitness val of old schedule > new schedule
        if (this.mutateChecker(multiverseInput[firstRandomScheduleIndex], multiverseInputCopy[firstRandomScheduleIndex]) < 0 )
        {
            multiverseInputCopy[firstRandomScheduleIndex].set_schedule(multiverseInput[firstRandomScheduleIndex]);
            multiverseInputCopy[firstRandomScheduleIndex].set_percentage(this.fitness(multiverseInput[firstRandomScheduleIndex].schedule));
            //console.log(multiverseInputCopy[firstRandomScheduleIndex].percentage);
        }

        if (this.mutateChecker(multiverseInput[secondRandomScheduleIndex], multiverseInputCopy[secondRandomScheduleIndex]) < 0)
        {
            multiverseInputCopy[secondRandomScheduleIndex].set_schedule(multiverseInput[secondRandomScheduleIndex]);
            multiverseInputCopy[secondRandomScheduleIndex].set_percentage(this.fitness(multiverseInput[secondRandomScheduleIndex].schedule));
        }

        return multiverseInputCopy;


    }

    //Checks if changes made to individual schedules from line_change or crossover were better or worse than just leaving it alone. 
    //Return 1 if Old schedule is worse than new schedule
    //Return -1 if new schedule is worse than old schedule
    // Return 0 if they are equal
    mutateChecker(theSchedule, theNewSchedule)
    {
        //console.log(theSchedule.percentage);
        //console.log(theNewSchedule.percentage);
        if(theSchedule.percentage < theNewSchedule.percentage){
            return 1;
        }
        else if (theSchedule.percentage > theNewSchedule.percentage){
            return -1;
        }
        else{
            return 0;
        }
    }


    /*
        Checks the threshold value of different types of functions. The parameters tells us what type to check.
        If we want to check the threshold to add a schedule, the type is 'add'.
        If we want to check the threshold for removing a schedule, the type is 'subtract'.
        If we want to check the threshold to stop looking for a schedule, the type is 'end'.

        @param type the type of threshold being checked
    */
    threshold(type, gen)
    {
        if (type == "add")
        {
            return 10 + gen; //change to algorithm
        }

        if (type == "subtract")
        {
            return 10 + gen; //change to algorithm
        }

        if (type == "end")
        {
            return 97.5; //change to algorithm
        }
    }

}
module.exports.WorkingClass = WorkingClass;
