import React from 'react';
import './Home.css';
import ahmed from './img/ahmed.png';
import Navbar from './Navbar';

import { Form, Button } from 'react-bootstrap';



function Contact() {
  return (
    <React.StrictMode>
      <div class="text" style={{marginTop:"4%"}}>
        <h1 style={{textAlign: "center;"}}>Contact me</h1>
      </div>

    <div style={{marginLeft:"9%", marginRight:"40%"}}>
      
      <Form>

      <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label style={{color:'black'}}>Name</Form.Label>
          <Form.Control type="text" placeholder="Please enter your name" />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{color:'black'}}>Email address</Form.Label>
          <Form.Control type="email" placeholder="Please enter your email" />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label style={{color:'black'}}>Subject</Form.Label>
          <Form.Control type="text" placeholder="Please enter the subject" />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label style={{color:'black'}}>Message</Form.Label>
          <Form.Control type="text" placeholder="Please enter the message" />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>
        <br/>
        <Button variant="dark" type="submit">
        Submit
      </Button>
    </Form>
    <br/>
    <br/>
    <br/>
    </div>
    </React.StrictMode>
  );
}

export default Contact;
