const connectDB = require("../config/db");

const createUser = async (userData) => {
  const db = await connectDB(); // Get the database connection from the config
  return db.collection("users").insertOne(userData); // Insert the user data into the "users" collection
};

const getAllUsers = async () => {
  const db = await connectDB();
  return db.collection("users").find().toArray(); // Fetch all users from the "users" collection and convert to an array
};

module.exports = { createUser, getAllUsers };

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
