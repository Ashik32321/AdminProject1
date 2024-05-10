import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react';
import { useRegistration } from './UseRegistration';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Login() {
    const [loading, setLoading] = useState(false);
    const [AdminDetails, handleAdminDetails] = useRegistration({
        adminemail: "",
        adminpassword: "",
    });
    const nav = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
    
        axios.post("http://localhost:3001/login", AdminDetails)
            .then((response) => {
                if (response.data.status === 'success') {
                    alert("logged in Successfully");
                    sessionStorage.setItem('token', response.data.token);
                    sessionStorage.setItem("adminId", JSON.stringify(response.data.adminId));
                    nav('/');
                    window.location.reload();
                } else if (response.data.status === 'error' && response.data.message === 'Incorrect password') {
                    setErrorMessage('Incorrect password');
                } else {
                    alert('Login failed. Please check your credentials.');
                }
            })
            .catch((error) => {
                console.error('Error during login:', error);
                alert('server error.');
            })
            .finally(() => {
                setLoading(false);
            });
    };
    
    
    return (
        <>
            <div className="login-container mt-5 border border-dark shadow-sm p-1 mb-5 bg-white">
                <div className="mt-5 mb-5">
                    <h2 className="text-primary text-center text-fluid">Login Page</h2>
                    <div className="d-flex justify-content-center">
                        <form action="post" onSubmit={handleSubmit}>
                            <label htmlFor="email"> Email :</label><br />
                            <input
                                className="form-control w-100"
                                type="email"
                                name="adminemail"
                                value={AdminDetails.adminemail}
                                onChange={handleAdminDetails}
                                placeholder='Your Email...'
                                required
                            /><br />

                            <label> Password : </label><br />
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    type={showPassword ? "text" : "password"}
                                    name="adminpassword"
                                    value={AdminDetails.adminpassword}
                                    onChange={handleAdminDetails}
                                    required
                                />
                                <button className="border-0 btn btn-primary" type="button" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errorMessage && <p className="text-danger">{errorMessage}</p>}
                            <br />
                            <Link to="/register" className="text-decoration-none custom-link">Create a new Account</Link><br /><br />
                            {loading ? (
                                <button className="btn btn-secondary w-100">Loading...</button>
                            ) : (
                                <button type="submit" className="btn btn-primary w-100">Login</button>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
