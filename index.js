const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
dotenv.config();

const uri =
  "mongodb+srv://" +
  process.env.USERNAME +
  ":" +
  process.env.PASSWORD +
  "@sndrs.n7krs.mongodb.net/" +
  process.env.DATABASE +
  "?retryWrites=true&w=majority";

async function main() {
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    await listDatabases(client);
  } catch (e) {
    console.log(e);
  }
}

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();
  console.log("List of databases: ");
  databasesList.databases.forEach((db) => {
    console.log(db);
  });
}

main();
