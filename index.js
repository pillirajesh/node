const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/login", (request, response) => {
  response.send("hello login");
});

app.post("/create-account", (request, response) => {
  const { name, email, password, companyName, age, date } = request.body;
  console.log(request.body);
});

app.listen(4000);
