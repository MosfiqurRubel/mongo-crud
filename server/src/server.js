const http = require("http");
const userRoutes = require("./routes/user.routes");

const server = http.createServer((req, res) => {
  // CORS Headers সেট করা
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight Request (OPTIONS) হ্যান্ডেল করা
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  // Handle incoming requests here by delegating to the userRoutes function
  userRoutes(req, res);
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
