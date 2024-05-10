const express = require('express');
const router = express.Router();
const Employee = require("../Model/EmployeeModel");
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Import uuidv4 correctly
const fs = require('fs');

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
router.post('/addemployee', upload.single('employeeimage'), async (req, res) => {
    try {
        const employeeId = uuidv4().slice(0, 6); // Shortened UUID to 6 characters
        const { employeename, employeephone,employeeemail, employeedesignation, employeegender, employeecourse, employeecreatedate } = req.body;
        const newEmployee = new Employee({ employeeId, employeename, employeephone,employeeemail, employeedesignation, employeegender, employeecourse, employeecreatedate });

        // Save the employee data
        const savedEmployee = await newEmployee.save();

        // If employee data saved successfully, upload the image
        if (savedEmployee) {
            const employeeimagePath = "/EmployeeProfiles/" + req.file.filename;
            savedEmployee.employeeimagePath = employeeimagePath;
            await savedEmployee.save();
            res.status(201).json({ message: 'Employee added successfully' });
        } else {
            // If employee data not saved successfully, delete the uploaded image
            if (req.file) {
                const employeeimagePath = path.join(__dirname, '../../public/EmployeeProfiles', req.file.filename);
                fs.unlinkSync(employeeimagePath);
            }
            res.status(500).json({ error: 'Failed to add employee' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
