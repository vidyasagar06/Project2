import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const[email,setemail]=useState("");
    const[password,setpassword]=useState("");
    const navigate = useNavigate();

    const LoginUser =async (e) => {
        e.preventDefault();
        try {
            const response =await axios.post('http://localhost:5000/api/user/login',{
                email:email,
                password:password
            });
            console.log(response);
            alert('Login successfull')
            navigate('/home');
        } catch (error) {
            if(error.response){
                alert(error.response.data.message);
            } else {
                alert('failed to login');
            }
            
            
        }
        
    };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={LoginUser}>
        <label>email:</label>
                <input 
                type="email"
                placeholder="your first name"
                onChange={(e)=>setemail(e.target.value)}
                required
                />
                <br /><br />
                <label>password</label>
                <input 
                type="password"
                placeholder="your password"
                onChange={(e)=>setpassword(e.target.value)}
                required
                />
                <br /><br />
                <button onClick={LoginUser}>LOGIN</button>
      </form>
    </div>
  )
}

export default Login
