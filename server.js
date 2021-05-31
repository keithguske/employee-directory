const path = require('path')

const express = require('express');
const mongoose = require('mongoose');

const employees = require("./db/employee-model");

const app = express();
app.set("port", 9000);
app.use(express.urlencoded({ extended: true }));

const mongoDB = "mongodb://localhost/employee-directory";
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error:"));
db.once('open', () => {console.log("MongoDB connection established")});

app.get("/api/search", (req, res) => {
  let name = req.query.name;
  let department = req.query.department;
  let jobTitle = req.query.jobTitle;
  let location = req.query.location;

  // Check for undefined
  name = (name) ? name : ''
  department = (department) ? department : '';
  jobTitle = (jobTitle) ? jobTitle : '';
  location = (location) ? location : '';

  console.log(name, department, jobTitle, location);

  employees.find({
    name: {$regex: name},
    department: {$regex: department},
    jobTitle: {$regex: jobTitle},
    location: {$regex: location}
  }, function(err, result) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      // console.log(result);
      res.send(result);
    }
  });
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});