process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const employees = require("../db/employee-model");

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();


chai.use(chaiHttp);

var id;
let employee = {
  name: "Test User",
  department: "finance",
  jobTitle: "Chief Financial Officer",
  location: "Harper's Ferry, West Virginia"
};
let employeeParams = new URLSearchParams(employee);

describe("Employees CRUD", () => {

  /*
    beforeEach((done) => { //Before each test we empty the database
        employees.remove({}, (err) => {
           done();
        });
    });
    */
/*
  * Test the /GET route
  */
  describe("Create", () => {
    it('it should CREATE an employee', (done) => {
      chai.request(server)
        .post('/api/createandupdate')
        .send(employeeParams.toString())
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.text.length.should.not.be.eql(0);
          id = res.body._id;
          done();
      });
    });
  });

  describe("Read", () => {
    it('it should READ an employee', (done) => {
      chai.request(server)
        .get(`/api/search?name=${employee.name}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.not.be.eql(0);
          done();
      });
    });
  });

  describe("Update", () => {
    it('it should UPDATE an employee', (done) => {
      employee.id = id;
      employee.name = "Test User II";
      employeeParams = new URLSearchParams(employee);

      chai.request(server)
        .post('/api/createandupdate')
        .send(employeeParams.toString())
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.text.length.should.not.be.eql(0);
          id = res.body._id;
          done();
      });
    });
  });

  describe("Delete", () => {
    it('it should DELETE an employee', (done) => {
      chai.request(server)
        .get(`/api/delete?id=${employee.id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.text.length.should.not.be.eql(0);
          id = res.body._id;
          done();
      });
    });
  });

});