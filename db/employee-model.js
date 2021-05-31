const mongoose = require('mongoose');

const employee = new mongoose.Schema({
    name: String,
    picture: String,
    thumbPicture: String,
    jobTitle: String,
    department: String,
    location: String
}, {collection: 'employees'});

module.exports = mongoose.model('employees', employee);