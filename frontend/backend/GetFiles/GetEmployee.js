// backend/routes/employees.js

const express = require('express');
const router = express.Router();
const Employee = require("../Model/EmployeeModel");

// GET all employees
router.get('/getemployee', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
