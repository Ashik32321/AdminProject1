import React from 'react'
import { useNavigate } from 'react-router-dom'

function GotoLogin() {
    const nav =useNavigate()
  return (
    <div className='container margin'>

        <h3 className='text-center  text-fluid mb-3'> Oops!! Your Not logged in</h3>
        <div  className='d-flex justify-content-center'>
          <div>

        <button onClick={()=>nav("/login") }  className="btn btn-primary ">Login</button><br/><br/>
       
        </div>
        
        </div>
    </div>
  )
}

export default GotoLogin