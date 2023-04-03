const { Room } = require("./room.js");
const {Schedule} = require("./Schedule.js");
const {Multiverse, Generation} = require("./Generation.js");
let fs = require('fs');

//the number of schedules we want to generate
const INITIAL_GENERATION_SCHEDULE_NUMBER_OF_HOW_MANY_SCHEDULES_WE_WANT = 10;

let teacherData = fs.readFileSync('TeacherData.csv',{encoding:'utf8'}, (err) => err && console.error(err));
let csvArray = teacherData.split(/\r?\n|\r|\n/g); //I dont know how that splits it, but it worked!!!
let classes = csvArray[7].split(',');

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
            //Making a copy that we can use of the main rooms -> due to weird reference properties
            var dupRoomArray = this.roomArray.slice();

            //Not enough classes to fill all rooms -> repeat classes
            if (dupClassArray.length < dupRoomArray.length)
            {
                dupClassArray = this.classArray.slice();
            }
            
            //Not enough teachers to fill all rooms -> repeat teachers
            if (dupTeacherArray.length < dupRoomArray.length)
            {
                dupTeacherArray = this.teacherArray.slice();
            }
            
            
            for (let i = 0; i < this.roomArray.length; i++)
            {
                //Getting a random teacher
                randomTeacherIndex = this.rand(0, dupTeacherArray.length - 1);

                //Getting a random class
                randomClassIndex = this.rand(0, dupClassArray.length - 1);

                //creating a room object -> weird reference issues
                var THE_OTHER_ROOM = dupRoomArray.pop();

                //Creating new class with each random attribute with generated earlier. 
                var theRoom = new Room(THE_OTHER_ROOM.room_number, THE_OTHER_ROOM.classList);

                //Adding the teacher to the room
                theRoom.set_room_teacher(dupTeacherArray[randomTeacherIndex])

                //Getting rid of this teacher from the list
                dupTeacherArray.splice(randomTeacherIndex,1);
                
                //Adding the class to the room
                theRoom.set_room_class(dupClassArray[randomClassIndex]);

                //Removing from the array
                dupClassArray.splice(randomClassIndex, 1);

                //Adding this new room to the array
                myClassPeriodArray.push(theRoom);

                //This will print out the full schedule, although not as nice as GeneticRepresentation.represent() will. 
                //console.log("Period " + (j+1) + ": Room: " + myClassPeriodArray[i].room_number + ", Teacher: "+ myClassPeriodArray[i].room_teacher + ",  \t" + "Class: " + myClassPeriodArray[i].room_class);
            }

            //Reference issues
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
                    let classIndex = classes.indexOf(theSchedule[j][i].room_class.name);
                    for(let m = 8; m < csvArray.length; m++)
                    {
                        let taughtClasses = csvArray[i].split(',');
                        if(taughtClasses[0] == theSchedule[j][i].room_teacher)
                        {
                            this.fitness_value += +taughtClasses[classIndex];
                        }
                    }
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
        this.fitness_value *= 100;
        return this.fitness_value;
        // this.fitness_value = 0;
        // this.maxfitness = 0;
        // for (let j = 0; j < theSchedule.length; j++) //checks class period
        // {
        //     for(let i = 0; i < theSchedule[j].length; i++) //rooms within each period
        //     {
        //         if (theSchedule[j][i].classList.includes(theSchedule[j][i].room_class.name))
        //         {
        //             this.fitness_value++;
        //         }

        //         this.maxfitness++;
                
        //         if (theSchedule[j][i].room_teacher.classList.includes(theSchedule[j][i].room_class.name))
        //         {
        //             this.fitness_value++;
                    
        //         }
        //         this.maxfitness++;
        //     }
        // }

        // return this.fitness_value/this.maxfitness * 100;
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
            omniverse.push(mutated_Schedules);
            
        } 
        
        var amount_of_times_we_should_crossover = 10;

        for (let i = 0; i < multiverseObject.genNo + amount_of_times_we_should_crossover; i++)
        {
            //omniverse = this.crossover(omniverse);
        }

        omniverse = this.eaglePurge(omniverse, multiverseObject.genNo);
        if (multiverseObject.genNo > 2)
        {
            omniverse = this.addition(omniverse);
        }

        for (let i = 0; i < 1; i++)
        {
            for (let j = 0; j < omniverse.length; j++)
            {
                omniverse = this.line_swap(omniverse,j);
            }
        }   
        
        //clear multiverseArray
        multiver = [];
        multiver = omniverse.slice();

        var omnipresent = new Generation(multiverseObject.genNo, multiver);



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

        return multiverseInput;
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
    line_swap(multiverseInput, theSchedule)
    {
        var multiverseInputCopy = [];
        for (let i = 0; i < multiverseInput.length; i++)
        {
            multiverseInputCopy.push(new Schedule(multiverseInput[i].schedule, multiverseInput[i].percentage));
        }

        //var randSchedule = this.rand(0, multiverseInput.length - 1);

        var randPeriod1 = this.rand(0, 7);
        var randPeriod2 = this.rand(0, 7);
        while (randPeriod1 == randPeriod2)
        {
            randPeriod2 = this.rand(0, 7);
        }

        var randRoom = this.rand(0, multiverseInput[theSchedule].schedule[randPeriod1].length - 1);

        var firstRoom = multiverseInput[theSchedule].schedule[randPeriod1][randRoom];
        var secondRoom = multiverseInput[theSchedule].schedule[randPeriod2][randRoom];

        //multiverseInputCopy[randSchedule].schedule[randPeriod1][randRoom].set_room_teacher(secondRoom.room_teacher);
        multiverseInputCopy[theSchedule].schedule[randPeriod1][randRoom].set_room_class(secondRoom.room_class);

        //multiverseInputCopy[randSchedule].schedule[randPeriod2][randRoom].set_room_teacher(firstRoom.room_teacher);
        multiverseInputCopy[theSchedule].schedule[randPeriod2][randRoom].set_room_class(firstRoom.room_class);

        multiverseInputCopy[theSchedule].set_percentage(this.fitness(multiverseInputCopy[theSchedule].schedule));

        //console.log(multiverseInput[randSchedule].percentage);
        //console.log(multiverseInputCopy[randSchedule].percentage);
        //console.log(this.mutateChecker(multiverseInput[randSchedule], multiverseInputCopy[randSchedule]) > 0);
        //console.log(multiverseInput[theSchedule].percentage < multiverseInputCopy[theSchedule].percentage);
        if(multiverseInput[theSchedule].percentage < multiverseInputCopy[theSchedule].percentage /*this.mutateChecker(multiverseInput[theSchedule], multiverseInputCopy[theSchedule]) > 0*/)
        {
            //console.log("Old: " + theSchedule + ": " + multiverseInput[theSchedule].percentage);
            //console.log("New: " + theSchedule + ": " + multiverseInputCopy[theSchedule].percentage);
            return multiverseInputCopy;
        }
        else
        {
            //console.log("Old: " + theSchedule + ": " + multiverseInput[theSchedule].percentage);
            //console.log("New: " + theSchedule + ": " + multiverseInputCopy[theSchedule].percentage);
            return multiverseInput;
        }
    }   

    //crosses two different schedules -> switching 1 class.
    crossover(multiverseInput)
    {
        var multiverseInputCopy = [];
        
        for (let i = 0; i < multiverseInput.length; i++)
        {
            multiverseInputCopy.push(new Schedule(multiverseInput[i].schedule, multiverseInput[i].percentage));
        }

        //Generating 2 random schedules -> values 0-length of multiverse (for 10 schedules it's 0-9)
        var firstRandomScheduleIndex = this.rand(0, multiverseInput.length - 1);   
        var secondRandomScheduleIndex = this.rand(0, multiverseInput.length - 1);
        while (secondRandomScheduleIndex == firstRandomScheduleIndex)
        {
            secondRandomScheduleIndex = this.rand(0, multiverseInput.length - 1);
        }   

        //Generating a random class period to use -> values 0-7
        var randPeriod = this.rand(0,7);

        //Generating a random class in this period to swap -> Values 0-16
        var firstRandRoomIndex = this.rand(0, multiverseInput[firstRandomScheduleIndex].schedule[randPeriod].length - 1);
        var secondRandRoomIndex = this.rand(0, multiverseInputCopy[secondRandomScheduleIndex].schedule[randPeriod].length-1);     

        //Accessing that random room
        try{
            var firstRoom = multiverseInputCopy[firstRandomScheduleIndex].schedule[randPeriod][firstRandRoomIndex];
        }
        catch(TypeError){
            console.log("First room error");
            firstRandomScheduleIndex ++;
            firstRandomScheduleIndex == multiverseInput.length ? firstRandomScheduleIndex = 0 : firstRandomScheduleIndex = firstRandomScheduleIndex;
            try{
                var firstRoom = multiverseInputCopy[firstRandomScheduleIndex].schedule[randPeriod][firstRandRoomIndex];
            }
            catch(TypeError){
                console.log(TypeError);
                console.log("Problem for first schedule!!!!!")
            }
        }

        try{
            var secondRoom = multiverseInputCopy[secondRandomScheduleIndex].schedule[randPeriod][secondRandRoomIndex];  
        }
        catch(TypeError){
            console.log("Second room error");
            secondRandomScheduleIndex ++;
            secondRandomScheduleIndex == multiverseInput.length ? secondRandomScheduleIndex = 0 : secondRandomScheduleIndex = secondRandomScheduleIndex;
            try{
                var secondRoom = multiverseInputCopy[secondRandomScheduleIndex].schedule[randPeriod][secondRandRoomIndex];
            }
            catch(TypeError){
                console.log(TypeError);
                
                console.log("Problem for second schedule!")
            } 
        }

        //Swapping classes
        multiverseInputCopy[firstRandomScheduleIndex].schedule[randPeriod][firstRandRoomIndex].set_room_teacher(secondRoom.room_teacher);
        multiverseInputCopy[firstRandomScheduleIndex].schedule[randPeriod][firstRandRoomIndex].set_room_class(secondRoom.room_class);

        multiverseInputCopy[secondRandomScheduleIndex].schedule[randPeriod][secondRandRoomIndex].set_room_teacher(firstRoom.room_teacher);
        multiverseInputCopy[secondRandomScheduleIndex].schedule[randPeriod][secondRandRoomIndex].set_room_class(firstRoom.room_class);
            
        //Updating fitness value of new potential classes
        multiverseInputCopy[firstRandomScheduleIndex].set_percentage(this.fitness(multiverseInputCopy[firstRandomScheduleIndex].schedule));
        multiverseInputCopy[secondRandomScheduleIndex].set_percentage(this.fitness(multiverseInputCopy[secondRandomScheduleIndex].schedule));

        //Checking the percentages such that if one schedule is improved we should keep that. 
        var new_first_schedule_percent = multiverseInput[firstRandomScheduleIndex].percentage;
        var old_first_schedule_percent = multiverseInputCopy[firstRandomScheduleIndex].percentage;

        if (old_first_schedule_percent > new_first_schedule_percent)
        {
            multiverseInputCopy[firstRandomScheduleIndex].set_schedule(multiverseInput[firstRandomScheduleIndex].schedule);
            multiverseInputCopy[firstRandomScheduleIndex].set_percentage(this.fitness(multiverseInput[firstRandomScheduleIndex].schedule));
        }

        var new_second_schedule_percent = multiverseInputCopy[secondRandomScheduleIndex].percentage;
        var old_second_schedule_percent = multiverseInput[secondRandomScheduleIndex].percentage;

        if (old_second_schedule_percent > new_second_schedule_percent)
        {
            multiverseInputCopy[secondRandomScheduleIndex].set_schedule(multiverseInput[secondRandomScheduleIndex].schedule);
            multiverseInputCopy[secondRandomScheduleIndex].set_percentage(this.fitness(multiverseInput[secondRandomScheduleIndex].schedule));
        }
        //console.log("Kept fitness val: " + multiverseInput[firstRandomScheduleIndex].percentage + "\n");
        return multiverseInputCopy;
    }


    //Checks if changes made to individual schedules from line_change or crossover were better or worse than just leaving it alone. 
    //Return 1 if Old schedule is worse than new schedule
    //Return -1 if new schedule is worse than old schedule
    // Return 0 if they are equal
    mutateChecker(theSchedule, theNewSchedule)
    {

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
            return -100 + gen*0.012; //change to algorithm
        }

        if (type == "subtract")
        {
            return -100 + gen*0.012; //change to algorithm
        }

        if (type == "end")
        {
            return 97.5; //change to algorithm
        }
    }

}

module.exports.WorkingClass = WorkingClass;
