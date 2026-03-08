// const { createUser, getUsers, getUserById, updateUser, deleteUser } = require("../controllers/user.controller");
const fs = require("fs");

const {
  createUserController,
  getUsersController,
} = require("../controllers/user.controller");

const userRoutes = (req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/users") {
    return getUsersController(req, res);
  } else if (method === "POST" && url === "/users") {
    let body = "";

    req.on("data", (chunk) => (body += chunk)); // Listen for data events to accumulate the request body
    req.on("end", () => {
      const parseData = JSON.parse(body); // Parse the accumulated body data as JSON

      req.body = {
        name: parseData.name,
        age: Number(parseData.age),
        isActive: true,
      };

      createUserController(req, res); // Call the controller function to handle user creation with the parsed data
    });
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
};

module.exports = userRoutes;
