const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://${.env.ADMIN_USERNAME}:{.env.ADMIN_PASSWORD}@cluster0.gnworbx.mongodb.net/?retryWrites=true&w=majority";


//Need to write class data in, then read it 

const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();

    const db = client.db("NNHS_DATA");
    const coll = db.collection("Class_Data");

    db.coll.insert([
      {
      class: "Software Engineering", room: 123, teacher: "Mr. Schmit"
      }
    ]);

    

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

console.log("---------")
