const { MongoClient } = require("mongodb");
require('dotenv').config();

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://"+process.env.ADMIN_USERNAME+":"+process.env.ADMIN_PASSWORD+"@cluster0.gnworbx.mongodb.net/?retryWrites=true&w=majority";
console.log(uri);
//Need to write class data in, then read it 


const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();

    const database = client.db("NNHS_DATA");
    const coll = database.collection("DATA");

    const cursor = coll.find({ Teachers: "Betthauser"});
    // iterate code goes here
    await cursor.forEach(console.log);
    

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


