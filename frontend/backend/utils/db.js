const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async () => {
    try {
        const DBurl = `${process.env.DBurl}/Project2`; 

        await mongoose.connect(DBurl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            authSource: 'admin', 
        });

        console.log("Connection successful to Database");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDb;
