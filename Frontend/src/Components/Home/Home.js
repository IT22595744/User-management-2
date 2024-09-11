import React from 'react';
import Nav from "../Nav/Nav";
import './Home.css';
import userprofile from './userprofile.jpg';

function Home() {
  
  return (
    <div className='my-background-image'>
      <Nav/>
      <h1 className='hed'>Welcome To Our User Management System</h1>
      <h6>Efficiently manage your users with our comprehensive User Management System. Our platform is designed to simplify and streamline user administration, making it easy for you to handle user accounts, permissions, and profiles all in one place
      Efficient user management is at the heart of any successful organization. Our User Management System is meticulously designed to provide a robust, secure, and user-friendly platform for managing all aspects of user administration. Whether you are onboarding new users, managing existing accounts, or monitoring user activity, our system offers a comprehensive suite of features to meet your needs.
      With our platform, user registration and authentication become seamless, ensuring that new users can quickly join and start using your services without hassle. Our advanced authentication mechanisms guarantee that every user interaction is secure, giving you peace of mind.
      </h6>
      <div className="image-container">
        <img src={userprofile} alt="User Profile" className="userprofile-image" />
      </div>
   
    </div>
  );
}

export default Home;
