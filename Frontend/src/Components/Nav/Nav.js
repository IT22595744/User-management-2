import React from 'react';
import './nav.css'
import { Link } from 'react-router-dom';
import logo from './logo.png'; 

function Nav() {
  return (
    <div>
      
      <ul className="home-ul">
      <img  src={logo} alt='logo'></img>
        <li className="home-li">
            <Link to="/mainhome" className="activehome-a">
            <h1>Home</h1></Link>
        </li>
        
        <li className="home-li">
        <Link to="/adduser" className="activehome-a">
            <h1>Add User</h1></Link>
        </li>
        <li className="home-li">
        <Link to="/userdetails" className="activehome-a">
            <h1>User Details</h1></Link>
        </li>
        <li className="home-li">
        <Link to="/sendpdf" className="activehome-a">
            <h1>Send pdf</h1></Link>
        </li>
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
        <li className="home-li">
        <Link to="/conus" className="activehome-a">
            <button className="btn btn-danger">Contact Us</button>
        </Link>
        </li>
        <li className="home-li">          
        <Link to="/register" className="activehome-a">
            <button className="btn btn-warning">Register</button>
        </Link>
        </li>
        <li className="home-li">
        <Link to="/log" className="activehome-a">
            <button className="btn btn-success">Login</button>
        </Link>
        </li>
        </div>
      </ul>
    </div>
  );
}

export default Nav;
