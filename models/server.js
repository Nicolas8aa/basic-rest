const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../db/config");

// Routes | controllers
const userRoutes = require("../routes/users");
const authRoutes = require("../routes/auth");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Connect to db
    this.connectDB();
    // Middlewares
    this.middlewares();
    // Routes
    this.routes();
  }

  async connectDB() {
    await dbConnection();
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
    this.app.use("/api/users", userRoutes);
    this.app.use("/api/auth", authRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running at port", this.port);
    });
  }
}

module.exports = Server;
