const { ObjectId } = require("mongodb");
const connectDB = require("../config/db");

const createUser = async (userData) => {
  const db = await connectDB(); // Get the database connection from the config
  return db.collection("users").insertOne(userData); // Insert the user data into the "users" collection
};

const getAllUsers = async () => {
  const db = await connectDB();
  return db.collection("users").find().toArray(); // Fetch all users from the "users" collection and convert to an array
};

const deleteUser = async (id) => {
  const db = await connectDB();
  console.log("Deleting ID", id);
  return db.collection("users").deleteOne({ _id: new ObjectId(id) });
};

const updateUser = async (id, userData) => {
  const db = await connectDB();
  return db
    .collection("users")
    .updateOne({ _id: new ObjectId(id) }, { $set: userData }); // Update the user with the specified ID using the provided data
};

module.exports = { createUser, getAllUsers, deleteUser, updateUser }; // Export the service functions to be used in the controllers

// const getAllUsers = async () => {
//   const db = await connectDB();
//   return db.collection("users").find().toArray();
// };

// const getUserById = async (id) => {
//   const db = await connectDB();
//   return db.collection("users").findOne({ _id: id });
// };

// const createUser = async (userData) => {
//   const db = await connectDB();
//   return db.collection("users").insertOne(userData);
// };

// const updateUser = async (id, userData) => {
//   const db = await connectDB();
//   return db.collection("users").updateOne({ _id: id }, { $set: userData });
// };

// const deleteUser = async (id) => {
//   const db = await connectDB();
//   return db.collection("users").deleteOne({ _id: id });
// };

// module.exports = {
//   getAllUsers,
//   getUserById,
//   createUser,
//   updateUser,
//   deleteUser
// };
