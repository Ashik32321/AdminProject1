const express = require('express');
const router = express.Router();
const Employee = require('../Model/EmployeeModel');

router.get('/searchemployee', async (req, res) => {
    const employeeemail = req.query.q;
    try {
        const employees = await Employee.find({ employeeemail: employeeemail });
        res.json(employees);
    } catch (error) {
        console.error('Error searching employees:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
