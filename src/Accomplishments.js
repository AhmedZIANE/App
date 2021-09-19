import React from 'react';
import './Home.css';
import Particles from 'react-particles-js';
import InProgress from './InProgress';
import Finished from './Finished';
import CertifHome from './CertifHome';

function Accomplishments() {
  return (
    <React.StrictMode>
<div style = {{backgroundColor:"black", marginTop:"0%"}}>
    <div class="text">

<h1 style={{textAlign:"center"}}>Accomplishments</h1>
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

  
  <p style={{color: "white",zIndex:"5;"}}>The concept of traditional education has changed radically within the last couple of years. Being physically present in a classroom isn’t the only learning option anymore — not with the rise of the internet and new technologies, at least. Nowadays, we have access to a quality education whenever and wherever we want, as long as we have access to internet. We are now living a new era — the revolution of online education — that's why I have decided to learn and benefit from this asset, hereafter some of my accomplissements.
</p>
</div>
</div>

<div class="container">
<ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
  <li class="nav-item" role="presentation">
    <a
      class="nav-link btn-dark active"
      id="ex3-tab-1"
      data-mdb-toggle="pill"
      href="#ex3-pills-1"
      role="tab"
      aria-controls="ex3-pills-1"
      aria-selected="true"
      ><strong>Home</strong></a>
  </li>
  <li class="nav-item" role="presentation">
    <a
      class="nav-link btn-dark"
      id="ex3-tab-2"
      data-mdb-toggle="pill"
      href="#ex3-pills-2"
      role="tab"
      aria-controls="ex3-pills-2"
      aria-selected="false"
      ><strong>In Progress</strong></a
    >
  </li>
  <li class="nav-item" role="presentation">
    <a
      class="nav-link btn-dark"
      id="ex3-tab-3"
      data-mdb-toggle="pill"
      href="#ex3-pills-3"
      role="tab"
      aria-controls="ex3-pills-3"
      aria-selected="false"
      ><strong>Completed</strong></a
    >
  </li>
</ul>


<div class="tab-content" id="ex2-content">
  <div
    class="tab-pane fade show active"
    id="ex3-pills-1"
    role="tabpanel"
    aria-labelledby="ex3-tab-1"
  >
    <CertifHome/>
  </div>
  <div
    class="tab-pane fade"
    id="ex3-pills-2"
    role="tabpanel"
    aria-labelledby="ex3-tab-2"
  >
    <InProgress/>
  </div>
  <div
    class="tab-pane fade"
    id="ex3-pills-3"
    role="tabpanel"
    aria-labelledby="ex3-tab-3"
  >
    <Finished/>
  </div>
</div>
</div>
    </React.StrictMode>
  );
}

export default Accomplishments;
