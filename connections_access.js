const { MongoClient } = require("mongodb");
require('dotenv').config();

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://"+process.env.ADMIN_USERNAME+":"+process.env.ADMIN_PASSWORD+"@cluster0.gnworbx.mongodb.net/?retryWrites=true&w=majority";
console.log(uri);
let json_data = []
let teacher_array = [];
let room_array = [];
let class_array = [];



const client = new MongoClient(uri);
async function run() {
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
    }

    //Separating data into just teachers
    for (const element of json_data) {
      if(Array.isArray(element["Teachers"])){
        for(const subArrayElement of element["Teachers"]) {
          if(!(teacher_array.includes(subArrayElement))){
            teacher_array.push(subArrayElement);
          }
        }
      }

      //Where if the array doesn't already have that teacher's name we add it.
      else{
        if(!(teacher_array.includes(element["Teachers"]))){
          teacher_array.push(element["Teachers"]);
        }
      }

    }

    //Separating data into just rooms
    for (const element of json_data) {
      if(Array.isArray(element["Room"])){
        for(const subArrayElement of element["Room"]) {
          if(!(room_array.includes(subArrayElement))){
            room_array.push(subArrayElement);
          }
        }
      }

      else{
        if(!(room_array.includes(element["Room"]))){
          room_array.push(element["Room"]);
        }
      }

    }

    //Printing out result arrays

    console.log(teacher_array);
    console.log(room_array);
    console.log(class_array);
 

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);




//json = JSON.stringify(json);
//fs.writeFile("data.json",json,(err) => err && console.error(err));