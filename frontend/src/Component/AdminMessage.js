import React from 'react'
import "../App.css";
import {Link } from "react-router-dom"
 
function AdminMessage() {
  return (
    <>
    <nav class="navbar bg-warning mt-4">
      <div className='container'>
     
         <Link className="navbar-brand" to="/">Admin Dashboard</Link>

        </div>
      
    </nav>
    <div className='login-container text-center margin' >
       <h3>Welcome to Admin Pannel</h3> 
        </div>
        </>
  )
}

export default AdminMessage
