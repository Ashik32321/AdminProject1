
import { useState } from 'react';

const useRegistration = (initialUserDetails) => {
  const generateUserId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const [Userdetails, setUserDetails] = useState({
    ...initialUserDetails,
    userId: generateUserId() 
  });

  const handleUserDetails = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      [name]: value
    }));
  };


  return [Userdetails, handleUserDetails];
};

export { useRegistration };
