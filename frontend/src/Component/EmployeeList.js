import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const nav = useNavigate()

    useEffect(() => {
        // Fetch employee data from the backend API
        axios.get('http://localhost:3001/getemployee')
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.error('Error fetching employee data:', error);
            });
    }, []);

    const Deleteemployee = async (_id) => {
        try {
            await axios.delete(`http://localhost:3001/deleteemployee/${_id}`);
            alert('Deleted successfully');
            // Assuming nav is a function to navigate, you can replace it with appropriate navigation logic
            nav("/sellerhome");
        } catch (error) {
            console.error('Error deleting:', error.message);
            alert("Server error");
        }
    }



    return (
        <div className="container mt-5">
            {employees.length === 0 ? (
                <div className="container">

                    <h3 className='text-center'>No Records Found</h3><br />

                </div>
            ) : (<>
                <h2 className="mb-4 text-primary text-center">Employee List</h2>
                <table className="table table-striped border">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Designation</th>
                            <th>Cource</th>
                            <th>Gender</th>
                            <th>Creation Date</th>
                            <th>action</th>

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
                                    {employee._id ? (
                                    <>
                                   <Link to={`/editemployee/${employee._id}`} className='btn btn-sm btn-warning mb-1'>Edit</Link><br/>
                                   </>
                                      

                                    ) : (
                                        <span className='btn btn-sm btn-disabled' disabled>Edit</span>
                                    )}
                                    <button className='btn btn-sm btn-danger' onClick={() => Deleteemployee(employee._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </>)}
        </div>
    );
}

export default EmployeeList;
