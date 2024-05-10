const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const AdminModel = require('../Model/AdminModel');


router.post('/register', async (req, res) => {
    const { adminemail, adminpassword, ...rest } = req.body;

    try {
        const existingAdmin = await AdminModel.findOne({ adminemail });

        if (existingAdmin) {
            return res.status(400).json({ message: 'User already registered' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(adminpassword, saltRounds);

        // Create a new user with the hashed password and other data
        const newUser = new AdminModel({
            adminemail,
            adminpassword: hashedPassword,
            ...rest
        });

        // Save the new user to the database
        await newUser.save();

        
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error during registration:', err);
        return res.status(500).json({ error: 'Internal server error', details: err.message });
    }
});

module.exports = router;
