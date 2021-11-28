const Server = require("./models/server");

require("dotenv").config();

// Call server class
const server = new Server();

// Launch server
server.listen();
