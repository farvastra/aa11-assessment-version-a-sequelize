const express = require("express");
require("express-async-errors");
require("dotenv").config();
console.log("Database file:", process.env.DB_FILE);

const app = express();

const port = 8002;
app.listen(port, () => console.log("Server-2 is listening on port", port));
