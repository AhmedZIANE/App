import React from 'react';
import uci from './img/UCI.png'

function CertifHome() {
  return (
    <React.StrictMode>
    
    <div class="container" id="container">

    <div class="card">
      <h5 class="card-header">Certificate</h5>
      <div class="card-body">
      <h5 class="card-title">Effective Problem-Solving and Decision-Making
    </h5>
      <p class="card-text">
      <button type="button" class="btn btn-outline-success btn-rounded" data-mdb-ripple-color="dark"> Completed</button>
      </p>
      <br/>
      <a href="https://www.coursera.org/account/accomplishments/verify/ZNBMHYM7FBNL" class="btn btn-dark" style={{color:"white"}}>View certificate</a>
      <br/>
      <br/>
      <hr/>
      <p>UNIVERSITY OF CALIFRNIA <img src={uci} style ={{height : "50px"}} className="img-fluid" />  </p>
      </div>
    </div>

    </div>
    <br/>
    <br/>
   
    </React.StrictMode>
  );
}

export default CertifHome;
