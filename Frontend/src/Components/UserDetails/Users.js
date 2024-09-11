import React, { useState,useEffect, useRef } from 'react';
import Nav from "../Nav/Nav";
import './userdetails.css'
import axios from "axios";
import User from "../User/User";
import {useReactToPrint} from "react-to-print";
const URL="http://localhost:5000/users";



const fetchHandler=async()=>{
  return await axios.get(URL).then((res) => res.data);
}
function Users() {
   
  const [users,setUsers]=useState([]);
  useEffect(()=>{
    console.log("abc")
    fetchHandler().then((data)=>{
      console.log("data",data)
      setUsers(data.Users)
    })
    .catch((e) => console.log(e));
  },[])

  //implementing the downloading report function
  const ComponentsRef=useRef();
  const handleprint=useReactToPrint({
    content:()=>ComponentsRef.current,
    //the report will be downloaded in this title
    DocumentTitle:"Users Report",
    //after report downloaded displaying alert msg
    onafterprint:()=>alert("Users Report Successfully Download !"),
  }) ;

  //implementing the search functions
  const [searchQuery,setSearchQuery]=useState("");
  const [noResults,setNoResults]=useState(false);

  const handlesearch=()=>{
      fetchHandler().then((data) => {
        const filteredUsers = data.Users.filter((user)=>
          Object.values(user).some((field)=>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())  
          ))
          setUsers(filteredUsers);
          setNoResults(filteredUsers.length === 0)
      });
   }

   const handlesendReport=()=>{
    //create the whatsapp chat url
    const phonenumber="+94770285277";
    const message=`selected User Reports`
    const WhatsAppUrl=`https://web.whatsapp.com/send?phone=${phonenumber}&text=${encodeURIComponent(
    message)}`;

    //open the whatsapp chat in new window
    window.open(WhatsAppUrl,"_blank");
   }
   

 return (
    <div className="bg2">
        <Nav/>
      <h1>User Details Display Page</h1>
     
      <input className="search" onChange={(e) => setSearchQuery(e.target.value)}
             type='text'
             name='search'
             placeholder='search user details'></input>

       <button className="nav_btn_log" onClick={handlesearch}>Search</button>  
       <div className='usercontainer'>    
      {/* calling the ComponentsRef where we want to start the downloading */}
      {noResults ?(
        <div>
          <p>No Users Found</p>
          </div>
      ):(
        
      <div ref={ComponentsRef}>
        
      {users && users.map((user,i)=>{
        console.log("userxyz",user)
        return (
        <div key={i}>
          <User user={user}/>
      </div>
    )})}
    </div>
    
    )}
    <div className='btngroup'>
    <button className="nav_btn_log" onClick={handleprint}>Download Report</button>
    {/* <br></br> */}
    <button className="nav_btn_regi" onClick={handlesendReport}>Send Whatsapp Message</button>
    </div>
    </div>
    </div>
  );
}

export default Users;
