const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    dob: Date, // Added Date of Birth field
    password: String,
    confirmPassword: String // Added Confirm Password field
     image: String, // Field to store image URL
});

const EmployeeModel = mongoose.model("employees", EmployeeSchema);
module.exports = EmployeeModel;





