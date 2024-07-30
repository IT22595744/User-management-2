import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Login() {

    const [email,setEmail]=useState("");
    const [message,setMessage]=useState("");
    const [password, setPassword] =useState("")

    const history=useNavigate();

    const handleInputChangeEmail=(e)=>{
    //  const {value}=e.target;
    //  setUser((prevUser) =>({...prevUser,[name]:value}))
     setEmail(e.target.value);
    };

    const handleInputChangePassword=(e)=>{
        const {value}=e.target;
       //  setUser((prevUser) =>({...prevUser,[name]:value}))
        setPassword(e.target.value);
       };

    const validateEmail = () => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if (regex.test(email)) {
            setMessage("Email is valid");
            return true
        } else if(!regex.test(email) ){
            setMessage("Email is not valid");
        }else{
            setMessage("");
        }
        return false
    };
 
    const handleSubmit=async(e)=>{

    const valid = validateEmail();
    if(valid===false)
    {
        return;
    }

     e.preventDefault();

    try{
        const response = await sendRequest();
        if (response.status === "ok"){
            alert("login Success");
            history("/userdetails");
        }else{
            alert("Login error");
        }
    }catch(err){
        alert("error"+err.message);
    }
    };
 
    const sendRequest=async()=>{
     return await axios
     .post("http://localhost:5000/login",{
        
         gmail:email,
         password:password,
     })
     .then((res)=>res.data)
    }
   
  return (
    <div className='bg'>
      <Nav/>
      <div className='form_1'>
       <h1>User Login</h1>
       <form>
        <label className='lab' >Gmail</label><br></br>
        <input type='email'   className='field' value={email} onChange={handleInputChangeEmail} name='gmail' required></input><br></br>
        <p className='message'>{message}</p>
        <br></br>
      
        
        <label className='lab'>Password</label><br></br>
        <input type='password' className='field' value={password} onChange={handleInputChangePassword}  name='password' required></input><br></br><br></br>
        <button  className='submit-style' onClick={handleSubmit}>Login</button>
        
       </form>
       </div>
    </div>
  );
}

export default Login;
