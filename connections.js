const { MongoClient } = require("mongodb");
require('dotenv').config();


// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://"+process.env.ADMIN_USERNAME+":"+process.env.ADMIN_PASSWORD+"@cluster0.gnworbx.mongodb.net/?retryWrites=true&w=majority";
console.log(uri)

//Need to write class data in, then read it 


const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();

    const database = client.db("NNHS_DATA");
    console.log(database);
    const coll = database.collection("DATA");

    const docs = [{
      class: "Computer Programming", room: 121, teacher: "Mr. Callaghan"
      }];


    const result = await coll.insertMany(docs);


    

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

console.log("---------")
