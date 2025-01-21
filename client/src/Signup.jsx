// import {React} from 'react'
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// //const cloudinary=require('cloudinary').v2;

// // cloudinary.config({ 
// //     cloud_name: 'dj2juzuu5', 
// //     api_key: '465124593463732', 
// //     api_secret: 'COr_Ct0q5d0OY4fGAmrXW3Jxl1o'
// //   });

// function Signup() {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [dob, setDob] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [error, setError] = useState("");
//     const navigate=useNavigate()

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Validate password
//         const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
//         if (!passwordRegex.test(password)) {
//             setError(
//                 "Password must be at least 8 characters long and include both letters and numbers."
//             );
//             return;
//         }

//         if (password !== confirmPassword) {
//             setError("Passwords do not match.");
//             return;
//         }

//         setError(""); // Clear error if validation passes

//         // Send data to the backend
//         axios
//             .post("http://localhost:3001/", { name, email, dob, password })
//             .then((result) => {
//                 console.log(result);
//                 alert("Registration done successfully!"); // Show success pop-up
//             navigate('/login')
//             })
//             .catch((err) => console.log(err))
        
//     };

//     return (
//         <div style={styles.container}>
//             <div style={styles.card} className="p-3 rounded">
//                 <h2 style={styles.heading}>Register</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                         <label htmlFor="name" style={styles.label}>
//                             <strong>Name</strong>
//                         </label>
//                         <input
//                             type="text"
//                             placeholder="Enter Name"
//                             autoComplete="off"
//                             name="name"
//                             className="form-control rounded-0"
//                             style={styles.input}
//                             onChange={(e) => setName(e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="email" style={styles.label}>
//                             <strong>Email</strong>
//                         </label>
//                         <input
//                             type="email"
//                             placeholder="Enter Email"
//                             autoComplete="off"
//                             name="email"
//                             className="form-control rounded-0"
//                             style={styles.input}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="dob" style={styles.label}>
//                             <strong>Date of Birth</strong>
//                         </label>
//                         <input
//                             type="date"
//                             name="dob"
//                             className="form-control rounded-0"
//                             style={styles.input}
//                             onChange={(e) => setDob(e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="password" style={styles.label}>
//                             <strong>Password</strong>
//                         </label>
//                         <input
//                             type="password"
//                             placeholder="Enter Password"
//                             autoComplete="off"
//                             name="password"
//                             className="form-control rounded-0"
//                             style={styles.input}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="confirmPassword" style={styles.label}>
//                             <strong>Confirm Password</strong>
//                         </label>
//                         <input
//                             type="password"
//                             placeholder="Confirm Password"
//                             autoComplete="off"
//                             name="confirmPassword"
//                             className="form-control rounded-0"
//                             style={styles.input}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                         />
//                     </div>
//                     {error && <p style={styles.error}>{error}</p>}
//                     <button type="submit" className="btn w-100 rounded-0" style={styles.registerButton}>
//                         Register
//                     </button>
//                     <p style={styles.text}>Already have an account?</p>
//                     <Link to="/login" className="btn w-100 rounded-0 text-decoration-none" style={styles.loginButton}>
//                         Login
//                     </Link>
//                 </form>
//             </div>
//         </div>
//     );
// }


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null); // State to store image
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate password
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long and include both letters and numbers."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(""); // Clear error if validation passes

    // Prepare form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("dob", dob);
    formData.append("password", password);
    if (image) {
      formData.append("image", image); // Append image file
    }

    // Send data to the backend
    axios
      .post("http://localhost:3001/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        console.log(result);
        alert("Registration done successfully!");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card} className="p-3 rounded">
        <h2 style={styles.heading}>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" style={styles.label}>
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              className="form-control rounded-0"
              style={styles.input}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" style={styles.label}>
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              style={styles.input}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dob" style={styles.label}>
              <strong>Date of Birth</strong>
            </label>
            <input
              type="date"
              name="dob"
              className="form-control rounded-0"
              style={styles.input}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" style={styles.label}>
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              style={styles.input}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" style={styles.label}>
              <strong>Confirm Password</strong>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              autoComplete="off"
              name="confirmPassword"
              className="form-control rounded-0"
              style={styles.input}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" style={styles.label}>
              <strong>Profile Image</strong>
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="form-control rounded-0"
              style={styles.input}
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <button
            type="submit"
            className="btn w-100 rounded-0"
            style={styles.registerButton}
          >
            Register
          </button>
          <p style={styles.text}>Already have an account?</p>
          <Link
            to="/login"
            className="btn w-100 rounded-0 text-decoration-none"
            style={styles.loginButton}
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}
const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to right, #6a11cb, #2575fc)", // Gradient background
    },
    card: {
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        width: "100%",
        maxWidth: "400px",
    },
    heading: {
        textAlign: "center",
        color: "#6a11cb",
        marginBottom: "1rem",
    },
    label: {
        color: "#333",
    },
    input: {
        border: "2px solid #6a11cb",
        borderRadius: "4px",
        padding: "10px",
    },
    registerButton: {
        backgroundColor: "#6a11cb",
        color: "#fff",
        fontWeight: "bold",
        padding: "10px",
        border: "none",
    },
    loginButton: {
        backgroundColor: "#f8f9fa",
        color: "#6a11cb",
        fontWeight: "bold",
        border: "2px solid #6a11cb",
        marginTop: "10px",
    },
    text: {
        textAlign: "center",
        marginTop: "10px",
        color: "#333",
    },
    error: {
        color: "red",
        fontSize: "14px",
        marginBottom: "10px",
    },
};

export default Signup;

