const { MongoClient } = require("mongodb");
require('dotenv').config();
let fs = require('fs');



// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://"+process.env.ADMIN_USERNAME+":"+process.env.ADMIN_PASSWORD+"@cluster0.gnworbx.mongodb.net/?retryWrites=true&w=majority";
console.log(uri);
let json_data = []



const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();

    const database = client.db("NNHS_DATA");
    const coll = database.collection("DATA");

    const cursor = coll.find();
    // iterate code goes here
    await cursor.forEach( function(myDoc) { json_data.push(myDoc); } );
    console.log(json_data);

    

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);




//json = JSON.stringify(json);
//fs.writeFile("data.json",json,(err) => err && console.error(err));