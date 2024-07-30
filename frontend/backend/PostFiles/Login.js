// routes/admin.js (Backend)
const express = require('express');
const router = express.Router();
const AdminModel = require('../Model/AdminModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const loginsecretKey = process.env.loginsecretKey;

router.post('/login', async (req, res) => {
    const { adminname, adminpassword } = req.body;

    try {
        const user = await AdminModel.findOne({ adminname });

        if (!user) { 
           
            return res.json({ status: 'User not found', message: 'User not found' });
          
        }

       
        else if (adminpassword !== user.adminpassword) {
            return res.json({ status: 'Incorrect password', message: 'Incorrect password' });
        }
        else{
            const token = jwt.sign({ adminId: user._id }, loginsecretKey, { expiresIn: '1h' });

            res.json({ status: 'success', token, adminId: user._id });
        }

       
        
    } catch (err) {
        console.log('Error during login:', err);
        res.status(500).json({ status: 'error', message: 'Server error. Please try again later.' });
    }
});

module.exports = router;
