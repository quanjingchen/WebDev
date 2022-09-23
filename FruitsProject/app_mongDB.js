const {
  MongoClient
} = require("mongodb");
const assert = require("assert")

// Replace the uri string with your connection string.
const uri =
  "mongodb://localhost:27017";

const client = new MongoClient(uri);
//Dabatase Name
const dbName = 'fruitsDB';

async function run() {
  try {
    const database = client.db(dbName);
    const collection = database.collection('fruits');
    // create a document to insert
    //   const docs = [
    //     {name: "Orange", score:6, review:"Kinda sour"},
    //     {name: "Banana", score:9, review:"Great stuff!"},
    // ];
    // const result = await collection.insertMany(docs);
    // console.log(`${result.insertedCount} documents were inserted`);
    const fruits = collection.find({});
    // print a message if no documents were found
    if ((await fruits.count()) === 0) {
      console.log("No fruits found!");
    }
    await fruits.forEach(console.dir);

  } finally {
    await client.close();
  }
}
run().catch(console.dir);
