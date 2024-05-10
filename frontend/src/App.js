
import React from 'react'
import { Routes,Route,BrowserRouter} from 'react-router-dom'
import Registration from './Component/Registration'
import Login from './Component/Login'
import  AdminHome  from "./Component/AdminHome"
import CreateEmployee from  "./Component/CreateEmployee"
import EmployeeList from './Component/EmployeeList'
import AdminMessage from './Component/AdminMessage'
import Private from './Component/Private'
import GotoLogin from './Component/GotoLogin'
import EditEmployee from './Component/EditEmployee'


function App() {
  return (
    <div>
    
      <BrowserRouter>
      <AdminHome/>
      <Routes>
      <Route path="/register" element={<Registration/>}></Route>
       <Route path="/login" element={<Login/>}></Route>
       <Route path="/gotologin" element={<GotoLogin/>}></Route>

        <Route path="/createemployee"  element={<Private><CreateEmployee/></Private>}></Route>
        <Route path="/employeeList" element={<Private><EmployeeList/></Private>}/>
        <Route path="/" element={<Private><AdminMessage/></Private>}/>
        <Route path="/editemployee/:id" element={<Private><EditEmployee/></Private>}></Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
