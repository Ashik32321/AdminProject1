const express = require('express');
const router = express.Router();
const Employee = require("../Model/EmployeeModel");
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../public/EmployeeProfiles'),
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Express Middleware
router.use('/EmployeeProfiles', express.static(path.join(__dirname, '../../public/EmployeeProfiles')));

// API to add employee
router.put('/updateemployee/:_id', upload.single('employeeimage'), async (req, res) => {
    try {
        const { _id } = req.params;
        const { employeename, employeephone, employeeemail, employeedesignation, employeegender, employeecourse, employeecreatedate } = req.body;

        // Find the employee by id
        const employee = await Employee.findById(_id);

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // Update employee details
        employee.employeename = employeename;
        employee.employeephone = employeephone;
        employee.employeeemail = employeeemail;
        employee.employeedesignation = employeedesignation;
        employee.employeegender = employeegender;
        employee.employeecourse = employeecourse;
        employee.employeecreatedate = employeecreatedate;

        // Update employee image if a new one is provided
        if (req.file) {
            const employeeimagePath = "/EmployeeProfiles/" + req.file.filename;
            employee.employeeimagePath = employeeimagePath;
        }

        // Save the updated employee
        const updatedEmployee = await employee.save();

        res.status(200).json({ message: 'Employee updated successfully', updatedEmployee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;


