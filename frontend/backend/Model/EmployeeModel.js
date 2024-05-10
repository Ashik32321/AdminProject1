const mongoose= require("mongoose")

const EmployeeSchema = new mongoose.Schema({

        employeeId:String ,
        employeename:String,
        employeephone:Number,
        employeeemail:String,
        employeedesignation:String,
        employeegender:String,
        employeecourse:String,
        employeeimage:String,
        employeecreatedate:String,
        employeeimagePath:String
       
 
})

const EmployeeLists= mongoose.model("EmployeeList",EmployeeSchema)

module.exports = EmployeeLists