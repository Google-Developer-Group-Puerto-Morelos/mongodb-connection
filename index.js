const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
dotenv.config();

const DATA = require("./users.json");
const uri =
  "mongodb+srv://" +
  process.env.USERNAME +
  ":" +
  process.env.PASSWORD +
  "@sndrs.n7krs.mongodb.net/?retryWrites=true&w=majority";

async function main() {
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
  });
  let myObj = {
    name: "Rafael",
    last_name: "Lagunas",
    city: "Cancún",
  };

  let collection_name = process.argv.slice(2)[0];
  try {
    //await listDatabases(client);
    //await createCollection(client, collection_name);
    //await insertOneToCollection(client, collection_name, myObj);
    await insertManyTocollection(client, collection_name, DATA);
  } catch (e) {
    console.log(e);
  }
}

async function listDatabases(client) {
  await client.connect();
  databasesList = await client.db().admin().listDatabases();
  console.log("List of databases: ");
  databasesList.databases.forEach((db) => {
    console.log(db);
  });
}

async function createCollection(client, collection_name) {
  await client.connect();
  client
    .db(process.env.DATABASE || "sndrs")
    .createCollection(collection_name, function (err, response) {
      if (err) console.log(err);

      console.log("Collection " + collection_name + " created");
      client.close();
    });
}

async function insertOneToCollection(client, collection_name, doc) {
  await client.connect();

  client
    .db(process.env.DATABASE || "sndrs")
    .collection(collection_name)
    .insertOne(doc, function (err, res) {
      if (err) console.log(err);
      console.log("Document inserted");
      client.close();
    });
}

async function insertManyTocollection(client, collection_name, docs) {
  await client.connect();

  client
    .db(process.env.DATABASE || "sndrs")
    .collection(collection_name)
    .insertMany(docs, function (err, result) {
      if (err) console.log(err);
      console.log("Many docs inserted");
      client.close();
    });
}

main();
