const MongoClient = require("mongodb").MongoClient; // acts as client for mongo server
const assert = require("assert").strict; // allows various checks of values

const url = "mongodb://localhost:27017/"; //url where mongo server can be accessed
const dbname = "nucampsite"; // name of specific database to connect to

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  assert.strictEqual(err, null); // first arg is actual value second is what we are checking against. if match continue on, if fail then error logged to console
  console.log("Connected correctly to server");

  const db = client.db(dbname); // connect to nucampsite database on mongo server, allows access to set of methods to interact with that database

  // deletes from database
  db.dropCollection("campsites", (err, result) => {
    assert.strictEqual(err, null);
    console.log("dropped collection", result);

    // recreates campsites collection
    const collection = db.collection("campsites");

    // adds the document to collection
    collection.insertOne(
      { name: "Breadcrumb Trail Campground", description: "Test" },
      (err, result) => {
        assert.strictEqual(err, null);
        console.log("insert Document:", result.ops);

        // returns all documents from collection with empty() toArray converts documents to array so it can be console logged
        collection.find().toArray((err, docs) => {
          assert.strictEqual(err, null);
          console.log("found documents:", docs);

          client.close(); // closes client connection to mongo server
        });
      }
    );
  });
}); // method that allows connecting client to server
