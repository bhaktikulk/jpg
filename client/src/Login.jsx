import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:3001/login", { email, password })
            .then((result) => {
                if (result.data.message === "Success") {
                    alert("Login successful!"); // Success pop-up
                    navigate('/home'); // Redirect after successful login
                } else {
                    alert(result.data.message); // Show the error message returned by backend
                }
            })
            .catch((err) => {
                console.error(err);
                alert("Login failed, please try again.");
            });

    };
    

    return (
        <div style={styles.container}>
            <div style={styles.card} className="p-3 rounded">
                <h2 style={styles.heading}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <label htmlFor="email" style={styles.label}>
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label htmlFor="password" style={styles.label}>
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>

                    <button type="submit" style={styles.button}>
                        Login
                    </button>
                </form>

                <p style={styles.text}>Don't have an account?</p>
                <Link to="/" style={styles.link}>
                    Sign up
                </Link>
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
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
    },
    card: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "400px",
    },
    heading: {
        textAlign: "center",
        marginBottom: "20px",
    },
    inputGroup: {
        marginBottom: "15px",
    },
    label: {
        fontSize: "14px",
        marginBottom: "8px",
    },
    input: {
        width: "100%",
        padding: "10px",
        borderRadius: "4px",
        border: "1px solid #ddd",
        fontSize: "14px",
    },
    button: {
        width: "100%",
        padding: "12px",
        backgroundColor: "#6a11cb",
        color: "#fff",
        border: "none",
        fontSize: "16px",
        fontWeight: "bold",
        borderRadius: "4px",
        cursor: "pointer",
    },
    text: {
        textAlign: "center",
        marginTop: "15px",
        color: "#333",
    },
    link: {
        display: "block",
        textAlign: "center",
        marginTop: "10px",
        textDecoration: "none",
        fontWeight: "bold",
        color: "#6a11cb",
    },
};

export default Login;

