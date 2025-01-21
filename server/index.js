// const express=require("express")
// const mongoose=require('mongoose')
// const cors=require("cors")
// const EmployeeModel=require('./models/Employee')

// const app=express()
// app.use(express.json())
// app.use(cors())

// mongoose
//   .connect("mongodb+srv://<Bhakti12>:<12345678a>@cluster.hozl3.mongodb.?retryWrites=true&w=majority&appName=Cluster", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
// //mongoose.connect("mongodb+srv://<Bhakti12>:<12345678a>@cluster.hozl3.mongodb.?retryWrites=true&w=majority&appName=Cluster");

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
  
//   EmployeeModel.findOne({ email: email })
//     .then(user => {
//       if (user) {
//         if (user.password === password) {
//           res.json({ message: "Success", user }); // Send success message
//         } else {
//           res.status(401).json({ message: "The password you have entered is incorrect" }); // Password incorrect
//         }
//       } else {
//         res.status(404).json({ message: "No record existed" }); // User not found
//       }
//     })
//     .catch(err => res.status(500).json(err)); // Server error
// });


// app.post('/', (req,res) => {
//     EmployeeModel.create(req.body)
//     .then(employees=> res.json(employees))
//     .catch(err=>res.json(err))
// })

// app.listen(3001, () => {
//     console.log("server is running")
// })

// const express=require("express");
// const mongoose=require('mongoose');
// const cors=require("cors");
// const EmployeeModel=require('./models/Employee');
// //const fileUpload=require("express-fileupload");
// //const cloudinary=require('cloudinary').v2;

// // cloudinary.config({ 
// //   cloud_name: 'dj2juzuu5', 
// //   api_key: '465124593463732', 
// //   api_secret: 'COr_Ct0q5d0OY4fGAmrXW3Jxl1o'
// // });

// const app=express()
// app.use(cors())
// app.use(express.json())
// //app.use(fileUpload())
// // app.use(cors(
// //   {
// //     origin:["https://stack-client-bay.vercel.app"],
// //     methods:["POST","GET"],
// //     credentials:true
// //   }
// //  ));

// //const fileUpload=require("express-fileupload");


// mongoose
//   .connect("mongodb+srv://Bhakti12:12345678a@cluster.hozl3.mongodb.net/employee?retryWrites=true&w=majority", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
// //mongoose.connect("mongodb+srv://<Bhakti12>:<12345678a>@cluster.hozl3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster");

// // app.use(fileUpload({
// //      useTempFiles:True
// // }))

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
  
//   EmployeeModel.findOne({ email: email })
//     .then(user => {
//       if (user) {
//         if (user.password === password) {
//           res.json({ message: "Success", user }); // Send success message
//         } else {
//           res.status(401).json({ message: "The password you have entered is incorrect" }); // Password incorrect
//         }
//       } else {
//         res.status(404).json({ message: "No record existed" }); // User not found
//       }
//     })
//     .catch(err => res.status(500).json(err)); // Server error
// });


// app.post('/', (req,res) => {
//     EmployeeModel.create(req.body)
//     .then(employees=> res.json(employees))
//     .catch(err=>res.json(err))
// })

// app.listen(3001, () => {
//     console.log("server is running")
// })

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

// Cloudinary Configuration
cloudinary.config({
  cloud_name: "dj2juzuu5",
  api_key: "465124593463732",
  api_secret: "COr_Ct0q5d0OY4fGAmrXW3Jxl1o",
});

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://Bhakti12:12345678a@cluster.hozl3.mongodb.net/employee?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Schema and Model
const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  dob: String,
  password: String,
  image: String, // Field to store image URL
});

const EmployeeModel = mongoose.model("Employee", EmployeeSchema);

// Routes

// Login Endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  EmployeeModel.findOne({ email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json({ message: "Success", user });
        } else {
          res.status(401).json({ message: "The password you have entered is incorrect" });
        }
      } else {
        res.status(404).json({ message: "No record existed" });
      }
    })
    .catch((err) => res.status(500).json(err));
});

// Signup Endpoint
app.post("/", async (req, res) => {
  const { name, email, dob, password } = req.body;
  let imageUrl = null;

  try {
    // Handle image upload if provided
    if (req.files && req.files.image) {
      const file = req.files.image;
      const uploadResult = await cloudinary.uploader.upload(file.tempFilePath);
      imageUrl = uploadResult.secure_url; // Save Cloudinary image URL
    }

    // Create a new employee record
    const newEmployee = await EmployeeModel.create({
      name,
      email,
      dob,
      password,
      image: imageUrl,
    });

    res.json(newEmployee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error. Could not create employee.", error: err });
  }
});

// Start Server
app.listen(3001, () => {
  console.log("Server is running ");
});

