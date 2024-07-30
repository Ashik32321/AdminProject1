const express = require('express');
const router = express.Router();
const Employee = require("../Model/EmployeeModel");
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../public/EmployeeProfiles'),
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.use('/EmployeeProfiles', express.static(path.join(__dirname, '../../public/EmployeeProfiles')));

router.post('/addemployee', upload.single('employeeimage'), async (req, res) => {
    try {
        const employeeId = uuidv4().slice(0, 6);
        const { employeename, employeephone, employeeemail, employeedesignation, employeegender, employeecourse, employeecreatedate } = req.body;
       
        const existingEmployee = await Employee.findOne({ employeeemail });

        if (existingEmployee) {
            return res.json({ status: 'User already registered' });
        }

        const newEmployee = new Employee({
            employeeId, employeename, employeephone, employeeemail, employeedesignation, employeegender, employeecourse, employeecreatedate
        });

        const savedEmployee = await newEmployee.save();

        if (savedEmployee) {
            const employeeimagePath = "/EmployeeProfiles/" + req.file.filename;
            savedEmployee.employeeimagePath = employeeimagePath;
            await savedEmployee.save();
            res.json({ status: 'Employee added successfully' });
        } else {
            if (req.file) {
                const employeeimagePath = path.join(__dirname, '../../public/EmployeeProfiles', req.file.filename);
                fs.unlinkSync(employeeimagePath);
            }
            res.json({ status: 'Failed to add employee' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
