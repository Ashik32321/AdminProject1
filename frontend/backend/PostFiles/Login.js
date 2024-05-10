const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const AdminModel = require('../Model/AdminModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const loginsecretKey = process.env.loginsecretKey;

router.post('/login', async (req, res) => {
    const { adminemail, adminpassword } = req.body;

    try {
        // Find the user by email
        const user = await AdminModel.findOne({ adminemail });

        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordMatch = await bcrypt.compare(adminpassword, user.adminpassword);

        if (!isPasswordMatch) {
            return res.status(401).json({ status: 'error', message: 'Incorrect password' });
        }

        // Passwords match, authentication successful
        const token = jwt.sign({ adminId: user._id }, loginsecretKey, { expiresIn: '1h' });

        // Return success response with token and user ID
        res.json({ status: 'success', token, adminId: user._id });
    } catch (err) {
        // Handle any errors that occur during the process
        console.error('Error during login:', err);
        res.status(500).json({ status: 'error', message: 'Server error. Please try again later.' });
    }
});

module.exports = router;
