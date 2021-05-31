const client = require('mongodb').MongoClient;
const fetch = require('node-fetch');

const dburl = "mongodb://localhost";
const apiurl = "https://randomuser.me/api/?results=100&nat=us"

const departments = {
  marketing: [
    "Market Research Analyst",
    "Advertising Director",
    "Brand Strategist",
    "SEO Manager",
    "Public Relations Coordinator"
  ], 
  finance: [
    "Chief Financial Officer",
    "Accountant",
    "Accounting Clerk",
    "Controller"
  ], 
  hr: [
    "Chief Human Resources Officer",
    "Staffing Coordinator",
    "Compensation Analyst"
  ], 
  it: [
    "Full Stack Engineer",
    "Network Administrator",
    "Help Desk Technician",
    "Chief Technology Officer"
  ], 
  other: [
    "Chairperson",
    "Contractor"
  ]
};
const dpts = Object.keys(departments);

client.connect(dburl, function(err, db) {
  if(err) throw err;
    
  const employeeDirectory = db.db("employee-directory");
  const employees = employeeDirectory.collection('employees');

  //Delete everything
  employees.deleteMany({}, function(err, obj) {
    if (err) throw err;
    console.log("Deleted " + obj.result.n + " documents");

    // Generate 100 random people using https://randomuser.me and generate them as documents
    fetch(apiurl).then(res => res.json()).then(json => {
      const people = json.results;
      const documents = [];

      people.forEach(person => {
        const department =  dpts[Math.floor(Math.random() * dpts.length)];
        const jobTitle = departments[department][Math.floor(Math.random() * departments[department].length)];

        documents.push({
          name: person.name.first + " " + person.name.last,
          picture: person.picture.large,
          thumbPicture: person.picture.thumbnail,
          department: department,
          jobTitle: jobTitle,
          location: person.location.city + ", " + person.location.state
        });
      });

      // Insert the documents
      employees.insertMany(documents, function(err, res) {
        if(err) throw err;
        console.log("Inserted " + res.insertedCount + " documents");
        db.close();
      });
    });
  });
});