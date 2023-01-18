const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://nnhsAdmin:<jonjonjonjon>@cluster0.gnworbx.mongodb.net/?retryWrites=true&w=majority";
console.log(uri)




/*
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();

    const db = client.db("sample_guides");
    const coll = db.collection("comets");

    // delete code goes here
    const doc = {
    orbitalPeriod: {
        $gt: 5,
        $lt: 80
    }
    };

    const result = await coll.deleteMany(doc);

    // amount deleted code goes here
    console.log("Number of documents deleted: " + result.deletedCount);

    

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

console.log("---------")


*/

