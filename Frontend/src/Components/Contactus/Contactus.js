import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Nav from '../Nav/Nav'
import './contactus.css'

function Contactus() {

    const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_42rcs0n',
         'template_rbs2mak',
          form.current, {
        publicKey: 'eaJuMTSGgUNVt5D-9',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          alert("success")
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert("Not send")
        },
      ); 
    } 
  return (
    <div className='bg'>
      <Nav/>
      <div className='form_1'>
      <h1>Contact Us</h1>
      <form ref={form} onSubmit={sendEmail}>
      <label className='lab'>Name</label><br></br>
      <input type="text" name="user_name" className='field' /><br></br><br></br>
      <label className='lab'>Email</label><br></br>
      <input type="email" name="user_email" className='field' /><br></br><br></br>
      <label className='lab'>Message</label><br></br>
      <textarea name="message" className='field_1' /><br></br><br></br><br></br>
      <input type="submit" value="Send" className='submit-style'/>
    </form>
    </div>
    </div>
  );
}

export default Contactus;
