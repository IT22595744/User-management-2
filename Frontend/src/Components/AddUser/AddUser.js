import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './adduser.css'


function AddUser() {
  //user inputs setting the inputs 
  const history=useNavigate();
  const [inputs,setInputs]=useState({
    //below name should used same as name as input name in the form
    name:"",
    gmail:"",
    age:"",
    address:"",

  });
  //implementing a function what should happen when make inputs and submit
  const handleChange=(e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value,
    }));
  };
  
  //after where should navigate,url related function
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(()=>history('/userdetails'))
  }
  
  //implementin the sendrequest function from above
  const sendRequest=async()=>{
    await axios.post("http://localhost:5000/users",{
      //module attribute name=name
      name:String(inputs.name),
      gmail:String(inputs.gmail),
      age:Number(inputs.age),
      address:String(inputs.address),
  
    }).then(res=>res.data);
  }
  return (
    <div className='bg '>
     <Nav/>
      <div className='form_1'>
      <h1>Add Users</h1>
      <form onSubmit={handleSubmit}>
        <label className='lab'>Name</label><br/>
        <input type="text" className='field' name="name" onChange={handleChange} value={inputs.name} required></input>
        <br></br>
        <br></br>
        <label className='lab'>Gmail</label><br/>
        <input type="gmail" className='field' name="gmail" onChange={handleChange} value={inputs.gmail} required></input>
        <br></br>
        <br></br>
        <label className='lab'>Age</label><br/>
        <input type="age" className='field' name="age" onChange={handleChange} value={inputs.age} required></input>
        <br></br>
        <br></br>
        <label className='lab'>Address</label><br/>
        <input type="address" className='field' name="address" onChange={handleChange} value={inputs.address} required></input>
        <br></br>
        <br></br>
        
       <button className='submit-style'>Submit</button>
      </form>
      </div>
    </div>
  );
}

export default AddUser;
