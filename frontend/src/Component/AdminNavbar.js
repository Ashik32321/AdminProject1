import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const _id = sessionStorage.getItem("adminId") ? sessionStorage.getItem("adminId").replace(/"/g, '') : '';

  const [adminName, setAdminName] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
}, []);

  useEffect(() => {
    // Fetch admin data when the component mounts
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/getadminprofile?_id=${_id}`);
        const adminData = response.data;
        if (adminData) {
          setAdminName(adminData.adminname);
          
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };
  
    fetchAdminData();
  }, [_id]); // Include _id in the dependency array to trigger the effect when it changes
  
  const logout = () => {
    // Remove the JWT token from session storage to log out the user
    sessionStorage.removeItem("token");
    
    // Update the isLoggedIn state to false
    setIsLoggedIn(false);
    
    // Show a success message
    alert("Logged out successfully");
    window.location.reload()
};
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
         
          <img src="./LogoImage/dealsdray_logo.jpeg" alt='logo' height={50} ></img>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/employeelist">Employee List</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/createemployee">Create Employee</Link>
              </li>
            </ul>
            <form className="d-flex">
              {isLoggedIn ? (
                <>
                  <span className="navbar-text text-primary me-3">Hello, {adminName}</span>
                  <button className='btn btn-secondary me-5' onClick={logout}>Logout</button>
                </>
              ) : (
                <button onClick={() => nav("/login")} className='btn btn-primary me-5'>Login</button>
              )}
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default AdminNavbar;
