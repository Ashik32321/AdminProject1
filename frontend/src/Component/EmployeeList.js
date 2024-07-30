import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const nav = useNavigate();

    useEffect(() => {
        // Fetch employee data from the backend API
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:3001/getemployee');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    };

    const Deleteemployee = async (_id) => {
        try {
            await axios.delete(`http://localhost:3001/deleteemployee/${_id}`);
            alert('Deleted successfully');
            fetchEmployees(); // Refresh the employee list after deletion
        } catch (error) {
            console.error('Error deleting:', error.message);
            alert("Server error");
        }
    };
    
    const handlesearch = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`http://localhost:3001/searchemployee?q=${searchQuery}`);
            setEmployees(response.data);
        } catch (error) {
            console.error('Error searching employees:', error);
            alert('Error searching employees');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-primary text-center">Employee List</h2>
            <div class="d-flex justify-content-end mb-4">
            <form onSubmit={handlesearch}>
                
                <div className='input-group'>
                    <input 
                        type="email" 
                        id="search" 
                        className='form-input'  
                        placeholder='Email...' 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className='btn btn-primary ' >Search</button>
                </div>
                
            </form>
            </div>
            {employees.length === 0 ? (
                <div className="container">
                    <h3 className='text-center'>No Records Found</h3><br />
                </div>
            ) : (
                <table className="table table-striped border">  
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Designation</th>
                            <th>Course</th>
                            <th>Gender</th>
                            <th>Creation Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee._id}>
                                <td>{employee.employeeId}</td>
                                <td>
                                    <img src={employee.employeeimagePath} alt="Employee" style={{ width: '100px' }} />
                                </td>
                                <td>{employee.employeename}</td>
                                <td>{employee.employeephone}</td>
                                <td>{employee.employeeemail}</td>
                                <td>{employee.employeedesignation}</td>
                                <td>{employee.employeecourse}</td>
                                <td>{employee.employeegender}</td>
                                <td>{employee.employeecreatedate}</td>
                                <td>
                                    <Link to={`/editemployee/${employee._id}`} className='btn btn-sm btn-warning me-1'>Edit</Link>
                                    <button className='btn btn-sm btn-danger' onClick={() => Deleteemployee(employee._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default EmployeeList;
