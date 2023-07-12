const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const sql = require("mysql");

const port = 7000;

app.use(bodyParser.json());
app.use(cors());

//below code used to connect to mysql database

const connectionToSqlDb = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "reactnodemysql",
  multipleStatements: true,
});

connectionToSqlDb.connect((err) => {
  if (!err) {
    console.log("Database Connected");
  } else {
    console.log("Databse not connected");
  }
});

//below code is used to send data to port http://localhost:7000 home

app.get("/", (req, res) => {
  const userData = [
    { name: "Rajesh", email: "john@gmail.com", age: 30 },
    { name: "Subham", email: "subham@gmail.com", age: 20 },
    { name: "Priya", email: "priya@gmail.com", age: 22 },
  ];

  res.send(userData);
});

//below code is used to send data to port http://localhost:7000/api/user

app.get("/api/user", (req, res) => {
  connectionToSqlDb.query("SELECT * FROM user", (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});

app.post("/api/adduser", (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const address = req.body.address;
  const phone = req.body.phone;
  const gender = req.body.gender;
  const country = req.body.country;

  var sql = `INSERT INTO new_user_registration (name, username, email, password, address, phone, gender, country) 
  VALUES ("${name}", "${username}", "${email}", "${password}", "${address}", "${phone}", "${gender}", "${country}")`;

  connectionToSqlDb.query(sql, (err, result) => {
    if (!err) {
      res.status(200).json("New User Registered Successfully!!!");
    } else {
      console.log(err);
    }
  });
});

//below code is used to send data to port http://localhost:7000/api/countrydetails

app.get("/api/countrydetails", (req, res) => {
  connectionToSqlDb.query("SELECT * FROM countrydetails", (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});

app.get("/api/registereduserdata", (req, res) => {
  var sql = `SELECT userid, name, username, email, phone, gender FROM new_user_registration `;
  connectionToSqlDb.query(sql, (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      console.log(err);
    }
  });
});

//below code is used to listen on  port http://localhost:7000

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
