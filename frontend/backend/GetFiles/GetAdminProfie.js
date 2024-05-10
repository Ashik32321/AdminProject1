const express = require('express');
const router = express.Router();
const AdminModel = require('../Model/AdminModel');

// API to get admin profile by id
router.get('/getadminprofile', async (req, res) => {
    try {
        const { _id } = req.query;
        console.log(_id)

        // Fetch admin profile by id
        const admin = await AdminModel.findById(_id);

        if (admin) {
            res.status(200).json(admin);
        } else {
            res.status(404).json({ message: 'Admin not found' });
        }
    } catch (error) {
        console.error('Error fetching admin profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
