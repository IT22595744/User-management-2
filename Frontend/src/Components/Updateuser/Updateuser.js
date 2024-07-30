import React, { useEffect, useState } from 'react';
import Nav from "../Nav/Nav";
import axios from 'axios'
import {useParams} from 'react-router'
import {useNavigate} from 'react-router-dom'


function Updateuser() {
    const[inputs,setInputs]=useState({});
    const history=useNavigate();
    const id=useParams().id;

    useEffect(()=>{
        const fetchHandler=async()=>{
            await axios
            .get(`http://localhost:5000/users/${id}`)
            .then((res)=>res.data)
            .then((data)=>setInputs(data.user))
        };
        fetchHandler();
    },[id]);
    
    //implementin the sendrequest function from above
    const sendRequest=async()=>{
        await axios
        .put(`http://localhost:5000/users/${id}`,{
            name:String(inputs.name),
            gmail:String(inputs.gmail),
            age:Number(inputs.age),
            address:String(inputs.address),  
        })
        .then((res)=>res.data);
    };

    //implementing a function what should happen when make inputs and submit 
    const handleChange=(e)=>{
        setInputs((prevState)=>({
          ...prevState,
          [e.target.name]:e.target.value,
        }));
      };
      
      //after where should navigate,url related function
      const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(()=>history('/userdetails'));
      };
      

  return (
    <div className='bg'>
      <Nav/>
      <div className='form_1'>
      <h1>Update Userdetails</h1>
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

export default Updateuser;
