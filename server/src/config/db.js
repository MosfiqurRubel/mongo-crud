const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

let dbInstance = null;

const connectDB = async () => {
  if (!dbInstance) {
    await client.connect(); // Connect to the MongoDB server
    console.log("MongoDB connected");
    dbInstance = client.db("mydb"); // Store the database instance for "mydb"
  }

  return dbInstance; // Return the cached database instance
};

module.exports = connectDB;
