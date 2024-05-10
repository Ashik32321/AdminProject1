const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = require("../Model/EmployeeModel");
const fs = require('fs');
const path = require('path');

router.delete('/deleteemployee/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        console.log(_id)

        // Check if _id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ error: 'Invalid _id' });
        }

        const deletedRecord = await Employee.findByIdAndDelete(_id);
        
        if (!deletedRecord) {
            return res.status(404).json({ error: 'Record not found' });
        }

        // Delete the uploaded image if exists
        if (deletedRecord.employeeimagePath) {
            const fullPath = path.join(__dirname, '../../', 'public', deletedRecord.employeeimagePath);
            fs.unlink(fullPath, (err) => {
                if (err) {
                    console.error(`Error deleting file: ${err}`);
                    return res.status(500).json({ error: 'Error deleting file' });
                } 
                console.log('Image file deleted successfully');
                res.json({ message: 'Item deleted successfully' });
            });
        } else {
            // No image path provided, only delete from database
            res.json({ message: 'Item deleted successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
