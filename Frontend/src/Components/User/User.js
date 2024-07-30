import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './user.css';

function User(props) {
  const {_id,name,gmail,age,address} =props.user ;

  //implementing the delete function below  deleteHandler
  const history=useNavigate();

  const deleteHandler=async()=>{
    await axios.delete(`http://localhost:5000/users/${_id}`)
    .then(res=>res.data)
    .then(()=>history("/"))
    .then(()=>history("/userdetails"))
  }

  return (
    <div>
      
      <h1 className='u1'>User Display</h1>
      
      <h2>ID:{_id}</h2>
      <h2>Name:{name}</h2>
      <h2>Gmail:{gmail}</h2>
      <h2>Age:{age}</h2>
      <h2>Address:{address}</h2>
      <button className='bt'>
      <Link to={`/userdetails/${_id}`} className='bt1'>Update</Link>
      </button>
      <button onClick={deleteHandler} className='bt'>Delete</button>
    </div>
  );
}

export default User;
