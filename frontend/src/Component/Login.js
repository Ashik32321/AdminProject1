import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react';
import { useRegistration } from './UseRegistration';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Login() {
    const [loading, setLoading] = useState(false);
    const [AdminDetails, handleAdminDetails] = useRegistration({
        adminname: "",
        adminpassword: "",
    });
    const nav = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3001/login', {
                adminname: AdminDetails.adminname,
                adminpassword: AdminDetails.adminpassword,
            });
    
            if (response.data.status === 'success') {
                setErrorMessage('')
                alert("Logged in successfully");
                sessionStorage.setItem('token', response.data.token);
                sessionStorage.setItem("adminId", JSON.stringify(response.data.adminId));
                nav('/');
                window.location.reload();
            } else if (response.data.status === "Incorrect password") {
                setErrorMessage('Incorrect password');
            } else {
                setErrorMessage('User Not Found ');
            }
        } catch (error) {
            console.log('Error during login:', error);
             alert("Server error")

    
        } finally {
            setLoading(false);
        }
    };
    
    
    return (
        <>
            <div className="login-container mt-5 border border-dark shadow-sm p-1 mb-5 bg-white">
                <div className="mt-5 mb-5">
                    <h2 className="text-primary text-center text-fluid">Login Page</h2>
                    <div className="d-flex justify-content-center">
                        <form action="post" onSubmit={handleSubmit}>
                            <label htmlFor="adminname" className="mb-1"> UserName :</label><br />
                            <input
                                className="form-control w-100"
                                type="text"
                                name="adminname"
                                value={AdminDetails.adminname}
                                onChange={handleAdminDetails}
                                placeholder='username'
                                autoComplete="off"
                                required
                            /><br />

                            <label htmlFor=" adminpassword" className="mb-1"> Password : </label><br />
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    type={showPassword ? "text" : "password"}
                                    name="adminpassword"
                                    value={AdminDetails.adminpassword}
                                    onChange={handleAdminDetails}
                                    autoComplete="off"    
                                    required
                                />
                                <button className="border-0 btn btn-primary" type="button" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errorMessage && <p className="text-danger text-center mt-1">{errorMessage}</p>}
                            <br />
                            
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
