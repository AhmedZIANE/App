import React from 'react';
import './Home.css';
import ahmed from './img/ahmed.png';
import Navbar from './Navbar';

import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Popup from './Popup';

class Contact extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: ''
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    axios({
      method: "POST",
      url:"http://localhost:3002/send",
      data:  this.state
    }).then((response)=>{
      if (response.data.status === 'success') {
        alert("Message Sent.");
        this.resetForm()
      } else if(response.data.status === 'fail') {
        alert("Message failed to send.")
      }
    })
  }

  resetForm(){
    this.setState({name: "", email: "", message: ""})
  }

  render() {
  return (
    <React.StrictMode>
      <div class="text" style={{marginTop:"4%"}}>
        <h1 style={{textAlign: "center;"}}>Contact me</h1>
      </div>

    <div style={{marginLeft:"9%", marginRight:"30%"}}>
      


    <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
          <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" value={this.state.name} onChange={this.onNameChange.bind(this)} />
          </div>
          <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
          </div>
          <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea className="form-control" rows="5" id="message" value={this.state.message} onChange={this.onMessageChange.bind(this)} />
          </div>
          <button type="submit" className="btn btn-dark">Submit</button>
        </form>

    <br/>
    <br/>
    <br/>
    </div>
    <Popup/>
    </React.StrictMode>
  );
}
      onNameChange(event) {
        this.setState({name: event.target.value})
      }

      onEmailChange(event) {
        this.setState({email: event.target.value})
      }

      onMessageChange(event) {
        this.setState({message: event.target.value})
      }

     
}

export default Contact;
