const MongoClient = require("mongodb").MongoClient; // acts as client for mongo server
const assert = require("assert").strict; // allows various checks of values
const dboper = require("./operations");

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

    // adds the document to collection
    dboper.insertDocument(
      db,
      { name: "Breadcrumb Trail Campground", description: "Test" },
      "campsites",
      (result) => {
        console.log("insert Document:", result.ops);

        dboper.findDocuments(db, "campsites", (docs) => {
          console.log("Found documents:", docs);

          dboper.updateDocument(
            db,
            { name: "Breadcrumb Trail Campground" },
            { description: "Updated Test Description" },
            "campsites",
            (result) => {
              console.log("updated document count:", result.result.nModified);
              dboper.findDocuments(db, "campsites", (docs) => {
                console.log("Found documents:", docs);

                dboper.removeDocument(
                  db,
                  { name: "Breadcrumb Trail Campground" },
                  "campsites",
                  (result) => {
                    console.log("Deleted document count:", result.deletedCount);
                    client.close();
                  }
                );
              });
            }
          );
        });
      }
    );
  });
}); // method that allows connecting client to server
