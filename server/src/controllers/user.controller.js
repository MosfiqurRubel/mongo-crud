const userService = require("../services/user.service");

const createUserController = async (req, res) => {
  try {
    const result = await userService.createUser(req.body); // Call the service function to create a new user with the data from the request body

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: true, id: result.insertedId })); // Respond with the ID of the created user
  } catch (err) {
    console.error("Error creating user:", err);
    res.writeHead(500);
    res.end("Error creating user");
  }
};

const getUsersController = async (req, res) => {
  try {
    const users = await userService.getAllUsers(); // Fetch all users from the service

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users)); // Respond with the list of users in JSON format
  } catch (err) {
    res.writeHead(500);
    res.end("Error fetching users");
  }
};

const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Controller hit", id);

    await userService.deleteUser(id);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ success: true, message: "User deleted successfully" }),
    );
  } catch (err) {
    console.log(err);
    res.writeHead(500);
    res.end("Error deleting user");
  }
};

module.exports = {
  createUserController,
  getUsersController,
  deleteUserController,
}; // Export the controller functions to be used in the routing setup
