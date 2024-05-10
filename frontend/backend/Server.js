const express = require('express');
const connectDb = require("./utils/db")
const cors = require("cors")
const bodyParser = require('body-parser');
const port = 3001;



const Register =require("./PostFiles/Register")
const Login =require("./PostFiles/Login")
const CreateEmloyee =require("./PostFiles/CreateEmployee")
const GetEmployee =require("./GetFiles/GetEmployee")
const getadmin = require("./GetFiles/GetAdminProfie")
const Deleteemployee =require("./DeleteFiles/DeleteEmployee")
const EditEmployee=require("./UpdateFiles/EditEmployee")


const app = express();
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type');
  if (req.method === 'OPTIONS') {
    res.status(204).send();
  } else {
    next();
  }
});


app.use(Register)
app.use(Login)
app.use(CreateEmloyee)
app.use(getadmin)
app.use(EditEmployee)

app.use(Deleteemployee)


app.use(GetEmployee)

connectDb().then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  
  })