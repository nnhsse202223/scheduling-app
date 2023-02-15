const { MongoClient } = require("mongodb");
const { WorkingClass} = require("./WorkingClass.js");
const {Room} = require("./Room.js");
const {Teacher} = require("./Teacher.js");
const {Classes} = require("./Classes.js");
const {Schedule} = require("./Schedule.js");
//const { DatabaseTest } = require("./DatabaseTest.js");
require('dotenv').config();

// Replace the uri string with your MongoDB deployment's connection string.
//this code is all pretty simple, honestly, if you don't know any of the code, you shouldn't be in class, ngl.
//^^ kidding btw ;)
const uri = "mongodb+srv://"+process.env.ADMIN_USERNAME+":"+process.env.ADMIN_PASSWORD+"@cluster0.gnworbx.mongodb.net/?retryWrites=true&w=majority";
// console.log(uri);

const client = new MongoClient(uri);

async function run() {
  var json_data = [];
  var teacher_array = [];
  var room_array = [];
  var class_array = [];
  
  try {
    await client.connect();

    const database = client.db("NNHS_DATA");
    const coll = database.collection("DATA");

    //Accessing all data in MongoDB collection
    const cursor = coll.find();

    //Saving data to local variable
    await cursor.forEach( function(myDoc) { json_data.push(myDoc); } );
    //console.log(json_data);
    
    //Separating data into just classes
    for (const element of json_data) {
      class_array.push(element["Class"]);
      class_array.push(element["Class_Type"]);

    }

    //Separating data into just teachers
    for (const element of json_data) {
      if(Array.isArray(element["Teachers"])){
        for(const subArrayElement of element["Teachers"]) {
          if(!(teacher_array.includes(subArrayElement))){
            teacher_array.push(subArrayElement);
            teacher_array.push(element["Class_Type"]);
          }
        }
      }

      //Where if the array doesn't already have that teacher's name we add it.
      else{
        if(!(teacher_array.includes(element["Teachers"]))){
          teacher_array.push(element["Teachers"]);
          teacher_array.push(element["Class_Type"]);
        }
      }

    }

    //Separating data into just rooms
    for (const element of json_data) {
      if(Array.isArray(element["Room"])){
        for(const subArrayElement of element["Room"]) {
          if(!(room_array.includes(subArrayElement))){
            room_array.push(subArrayElement);
            room_array.push(element["Class_Type"]);
          }
        }
      }

      else{
        if(!(room_array.includes(element["Room"]))){
          room_array.push(element["Room"]);
          room_array.push(element["Class_Type"]);
        }
      }

    }

    //Printing out result arrays

    // console.log(teacher_array);
    // console.log(room_array);
    // console.log(class_array);
 

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();

    return {class: class_array, teacher: teacher_array, room: room_array};
  }
}


function get_teacher_array(){
  return teacher_array;
}

function get_class_array(){
  return class_array;
}

function get_room_array(){
  return room_array;
}



//json = JSON.stringify(json);
//fs.writeFile("data.json",json,(err) => err && console.error(err));
module.exports.get_teacher_array = get_teacher_array;
module.exports.get_class_array = get_class_array;
module.exports.get_room_array = get_room_array;
module.exports.run = run;
// module.exports.connections_access = connections_access;
