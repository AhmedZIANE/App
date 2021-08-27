import React from 'react';
import './Home.css';
import ahmed from './img/ahmed.png';
import Navbar from './Navbar';
import Particles from 'react-particles-js';

function Accomplishments() {
  return (
    <React.StrictMode>
<div style = {{backgroundColor:"black", marginTop:"0%"}}>
    <div class="text">

<h1 style={{textAlign:"center"}}>Ceritifications</h1>
<Particles height={"200px"} 
params={{
    
    "interactivity": {
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            }
        }
    }
}}
/>
<br/>
<br/>
  
  <p style={{color: "white",zIndex:"5;"}}>The concept of traditional education has changed radically within the last couple of years. Being physically present in a classroom isn’t the only learning option anymore — not with the rise of the internet and new technologies, at least. Nowadays, we have access to a quality education whenever and wherever we want, as long as we have access to internet. We are now living a new era — the revolution of online education, that's why I have decided to learn and benefit from this asset, hereafter some of my accomplissements :
    <br/><br/>
    
    <br/>
    <br/>
    <ul>
      <h3>Getting Started with Google Kubernetes Engine</h3>
      <br/>
      <li>Issuing body :  Coursera </li>
      <li>Collaboration with :  Google Cloud </li>
      <li>Delivery date : August 2021 </li>
      <br/>
      <button type="button" class="btn btn-outline-dark" data-mdb-ripple-color="dark">
      <a href="https://coursera.org/share/e99a21336684e425ef713a8dee553a43" style={{color:"white"}}>Diploma URL</a>
      </button>
    </ul>
    <br/>
    <ul>
      <h3>Machine Learning by Stanford University</h3>
      <br/>
      <li>Issuing body :  Coursera </li>
      <li>Collaboration with :  Stanford University </li>
      <li>Delivery date : October 2018 </li>
      <br/>
      <button type="button" class="btn btn-outline-dark" data-mdb-ripple-color="dark">
      <a href="https://www.coursera.org/account/accomplishments/verify/HETTAUY5KEFQ" style={{color:"white"}}>Diploma URL</a>
      </button>
    </ul>
    <br/>
    <ul>
      <h3>Python foundations</h3>
      <br/>
      <li>Issuing body :  HackerRank </li>
      <li>Delivery date : March 2021 </li>
    <br/>
    <button type="button" class="btn btn-outline-dark" data-mdb-ripple-color="dark">
          <a href="https://www.hackerrank.com/certificates/616f734133a5" style={{color:"white"}}>Diploma URL</a>
    </button>
    </ul>

  </p>
 
  </div>
</div>
    </React.StrictMode>
  );
}

export default Accomplishments;
