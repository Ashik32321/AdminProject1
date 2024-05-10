import React from 'react';
import { Navigate } from 'react-router-dom';


function Private({ children }) {
    // Retrieve the JWT token from session storage
    const token = sessionStorage.getItem('token');

  

    // Check if the token is valid and the user is logged in
    const isAuthenticated = token 

    // Render the children if the user is authenticated, otherwise redirect to the seller login page
    return isAuthenticated ? children : <Navigate to="/gotologin" />;
}

export default Private;
