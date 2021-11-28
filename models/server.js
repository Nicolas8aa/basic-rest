const express = require("express");
const cors = require("cors");
const usersController = require("../routes/users");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Middlewares
    this.middlewares();
    // Routes
    this.routes();
  }
  middlewares() {
    // Cors
    this.app.use(cors());

    // Read and parse the body
    this.app.use(express.json());

    // Public path
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use("/api/users", usersController);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running at port", this.port);
    });
  }
}

module.exports = Server;
