
import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState } from 'react';
import { useRegistration } from "./UseRegistration";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css"

function Registration() {
    const [loading, setLoading] = useState(false);
    const [AdminDetails, handleAdminDetails] = useRegistration({
        adminname: "",
        adminemail: "",
        adminpassword: "",
        admincpassword: ""
    });

    const nav = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

  
    const [nameAlert, setNameAlert] = useState("");
    const [emailAlert, setemailAlert] = useState("");
    const [passwordAlert, setPasswordAlert] = useState("");
    const [cpasswordAlert, setCPasswordAlert] = useState("");

    const validate = async (e) => {
        e.preventDefault();
    
      
        setNameAlert("");
        setemailAlert("");
        setPasswordAlert("");
        setCPasswordAlert("");
    
      
        if (AdminDetails.adminname === "") {
            setNameAlert("UserName shouldn't be null");
            return;
        }
        if (AdminDetails.adminemail === "") {
            setemailAlert("Email shouldn't be null");
            return;
        }
        if (AdminDetails.adminpassword === "") {
            setPasswordAlert("Password shouldn't be null");
            return;
        }
        if (AdminDetails.adminpassword.length < 8) {
            setPasswordAlert("Password should be at least 8 characters");
            return;
        }
        if (AdminDetails.admincpassword === "") {
            setCPasswordAlert("Confirm password shouldn't be null");
            return;
        }
        if (AdminDetails.adminpassword !== AdminDetails.admincpassword) {
            setCPasswordAlert("Password mismatch");
            return;
        }
    
        try {
            setLoading(true);
           
            const response = await axios.post("http://localhost:3001/register", AdminDetails);
            const { data } = response;
    
            if (data.message === "User already registered") {
                alert(" already registered");
                nav("/login");
            } else if (data.message === "User registered successfully") {
                alert("Registered successfully");
                nav("/login");
            } else {
                alert("Unexpected server response");
            }
        } catch (error) {
            setLoading(false);
    
            // Handle server error responses
            if (error.response) {
                const { status, data } = error.response;
    
                if (status === 400) {
                    // Handle bad request errors
                    alert( data.message);
                } else {
                    // Handle other server errors
                    alert("Server error: ");
                }
            } else {
                alert("Network error: Please check your connection.");
            }
        }
    };
    
    
    return (
        <>
            <div className="login-container mt-3 border border-dark shadow-sm p-1 mb-5 bg-white  ">
                <div className="mt-5 mb-5">
                    <h2 className="text-primary text-center">Registration</h2>

                    <div className="d-flex justify-content-center ">
                        <form action="post" onSubmit={validate}>
                            <label className="form-label"> User Name :</label>
                            <input
                                className="form-control"
                                type="text"
                                name="adminname"
                                value={AdminDetails.adminname}
                                onChange={handleAdminDetails}
                                placeholder='User Name...' />
                            <div className="text-danger">{nameAlert}</div><br />

                            <label className="form-label"> Email :</label>
                           
                                <input className="form-control"
                                    type="email"
                                    name="adminemail"
                                    value={AdminDetails.adminemail}
                                    onChange={handleAdminDetails}
                                    placeholder='Your Email...' />
                            
                            <div className="text-danger">{emailAlert}</div><br />

                            <label className="form-label"> Password :</label>
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    type={showPassword ? "text" : "password"}
                                    name="adminpassword"
                                    value={AdminDetails.adminpassword}
                                    onChange={handleAdminDetails}
                                />
                                <button className="btn btn-primary" type="button" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <div className="text-danger">{passwordAlert}</div><br />

                            <label className="form-label"> Confirm Password : </label><br />
                            <input
                                className="form-control"
                                type="password"
                                name="admincpassword"
                                value={AdminDetails.admincpassword}
                                onChange={handleAdminDetails}
                            />
                            <div className="text-danger">{cpasswordAlert}</div><br />
                            <>
                            {loading ? (
                  
                  <button className="btn btn-secondary w-100">Loading...</button>
               ) : (
                            <button type="submit" className="btn btn-primary w-100">SignUp</button>)}</>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Registration;  