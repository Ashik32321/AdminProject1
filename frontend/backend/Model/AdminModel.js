const mongoose= require("mongoose")

const AdminSchema = new mongoose.Schema({

        adminId:String ,
        adminname:String,
        adminemail:String,
        adminpassword:String,
       
 
})

const AdminRegister = mongoose.model("AdminRegister",AdminSchema)

module.exports = AdminRegister