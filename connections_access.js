const { MongoClient } = require("mongodb");
const { WorkingClass} = require("./WorkingClass.js");
require('dotenv').config();

// Replace the uri string with your MongoDB deployment's connection string.
//this code is all pretty simple, honestly, if you don't know any of the code, you shouldn't be in class, ngl.
//^^ kidding btw ;)
const uri = "mongodb+srv://"+process.env.ADMIN_USERNAME+":"+process.env.ADMIN_PASSWORD+"@cluster0.gnworbx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
  var json_data = [];
  var teacher_array = [];
  var room_array = [];
  var class_array = [];
  
  try {
    await client.connect();

    //Accessing all data in MongoDB collection
    const database = client.db("NNHS_DATA");
    const coll = database.collection("DATA");
    const cursor = coll.find();

    //Saving data to local variable
    await cursor.forEach( function(myDoc) { json_data.push(myDoc); } );
    
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

  } finally {
    await client.close();
    return {class: class_array, teacher: teacher_array, room: room_array};
  }
}

module.exports.run = run;
