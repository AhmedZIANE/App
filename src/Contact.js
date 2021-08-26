import React from 'react';
import './Home.css';
import ahmed from './img/ahmed.png';
import Navbar from './Navbar';

import { Form, Button } from 'react-bootstrap';



function Contact() {
  return (
    <React.StrictMode>
      <div class="text">
        <h1 style={{textAlign: "center;"}}>Contact me</h1>
      </div>
      <form class="container" style={{marginTop:" 5%;width: 70%;"}}>
  
  
  <div class="form-outline mb-4">
    <input type="text" id="form4Example1" class="form-control" />
    <label class="form-label" for="form4Example1">Name</label>
  </div>

  
  <div class="form-outline mb-4">
    <input type="email" id="form4Example2" class="form-control" />
    <label class="form-label" for="form4Example2">Email address</label>
  </div>

  
  <div class="form-outline mb-4">
    <input type="phone" id="form4Example2" class="form-control" />
    <label class="form-label" for="form4Example2">Phone number</label>
  </div>

  
  <div class="form-outline mb-4">
    <textarea class="form-control" id="form4Example3" rows="4"></textarea>
    <label class="form-label" for="form4Example3">Message</label>
  </div>

  
  <div style={{width:"30%",marginLeft: "35%;"}}>
    <button  type="submit" class="btn btn-dark btn-block mb-4" >Send</button>
  </div>  
</form>
    </React.StrictMode>
  );
}

export default Contact;
