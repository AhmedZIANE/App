import { useState } from 'react';
import APIService from './APIService';
import Popup from './Popup';

const Contact = (props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  
  const handleSubmit=(event)=>{ 
    event.preventDefault()
    APIService.InsertArticle({"name": name , "email" : email, "message" : message})
    /*setName(event.target.value)
    setEmail(event.target.value)
    setMessage(event.target.value)
  */
    setName("")
    setEmail("")
    setMessage("")
    alert("Thank youu " + name + " for getting in touch with me 😄");
    
  }

return (
     <div>
     <div className="text" style={{marginTop:"4%"}}>
        <h1 style={{textAlign: "center;"}}>Contact me</h1>
      </div>

    <div style={{marginLeft:"9%", marginRight:"30%"}}>
      

    <h4 style={{color:"black"}}></h4>
    <br/>
    <br/>
    <form id="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" value={name} onChange={(e)=>setName(e.target.value)} required/>
          </div>
          <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={(e)=>setEmail(e.target.value)}  required />
          </div>
          <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea className="form-control" rows="5" id="message" value={message} onChange={(e)=>setMessage(e.target.value)}  required/>
          </div>
          <button type="submit" className="btn btn-dark">Submit</button>
        </form>

    <br/>
    <br/>
    <br/>
    
    </div>
    <Popup/>
     </div>
)
}
export default Contact;