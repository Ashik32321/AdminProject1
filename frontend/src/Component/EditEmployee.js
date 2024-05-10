import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditEmployee() {
    const [formData, setFormData] = useState({
        employeename: "",
        employeephone: "",
        employeeemail: "",
        employeedesignation: "",
        employeegender: "",
        employeecourse: "",
        employeeimage: null,
        employeecreatedate: ""
    });
    const [loading, setLoading] = useState(false);
    const { id } = useParams(); 
    const _id=id
   


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleGenderChange = (e) => {
        setFormData({ ...formData, employeegender: e.target.value });
    };

    const handleCourseChange = (e) => {
        setFormData({ ...formData, employeecourse: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, employeeimage: file });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const currentDate = new Date().toISOString().slice(0, 10); // Get current date

        // Create FormData object and append form data
        const formDataObj = new FormData();
        formDataObj.append('employeename', formData.employeename);
        formDataObj.append('employeephone', formData.employeephone);
        formDataObj.append('employeeemail', formData.employeeemail);
        formDataObj.append('employeedesignation', formData.employeedesignation);
        formDataObj.append('employeegender', formData.employeegender);
        formDataObj.append('employeecourse', formData.employeecourse);
        formDataObj.append('employeeimage', formData.employeeimage);
        formDataObj.append('employeecreatedate', formData.employeecreatedate || currentDate); // Use existing date or current date

        axios.put(`http://localhost:3001/updateemployee/${_id}`, formDataObj, {
            headers: {
                'Content-Type': 'multipart/form-data' // Set content type for FormData
            }
        })
            .then((response) => {
                setLoading(false);
                alert("Employee updated successfully");
            })
            .catch((error) => {
                console.error('Error updating employee', error);
                alert('Error updating employee');
            })
            .finally(() => {
                setLoading(false);
            });
    };


    return (
        <div className="login-container mt-5  border border-dark shadow-sm p-5 mb-5 bg-white">
            <div>
                <h2 className="mb-4 text-center text-primary">Edit Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name:</label>
                        <input type="text" className="form-control" name="employeename" value={formData.employeename} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone:</label>
                        <input type="text" className="form-control" name="employeephone" value={formData.employeephone} onChange={handleChange} pattern="[0-9]{10}" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input type="email" className="form-control" name="employeeemail" value={formData.employeeemail} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Designation:</label>
                        <select className="form-select" name="employeedesignation" value={formData.employeedesignation} onChange={handleChange} required>
                            <option value="">Select Designation</option>
                            <option value="HR">HR</option>
                            <option value="Manager">Manager</option>
                            <option value="Sales">Sales</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Gender:</label>
                        <div>
                            <label className="form-check-label me-3">
                                <input type="radio" className="form-check-input" name="employeegender" value="Male" checked={formData.employeegender === "Male"} onChange={handleGenderChange} required />
                                Male
                            </label>
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="employeegender" value="Female" checked={formData.employeegender === "Female"} onChange={handleGenderChange} required />
                                Female
                            </label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Image:</label>
                        <input
                            type="file"
                            className="form-control"
                            name="employeeimage"
                            accept='image/*'
                            onChange={handleImageChange}
                            required
                        />
                        {formData.employeeimage && (
                            <img src={URL.createObjectURL(formData.employeeimage)} alt="Employee" className="mt-2" style={{ maxWidth: '200px' }} />
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Course:</label>
                        <select className="form-select" name="employeecourse" value={formData.employeecourse} onChange={handleCourseChange} required>
                            <option value="">Select Course</option>
                            <option value="MCA">MCA</option>
                            <option value="BCA">BCA</option>
                            <option value="BSC">BSC</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? 'Editing Employee...' : 'Edit Employee'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditEmployee;
