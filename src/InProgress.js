import React from 'react';
import aws from './img/aws.png';

function InProgress() {
  return (
    <React.StrictMode>
    
    <div class="container" id="container">

    <div class="card">
      <h5 class="card-header">Certificate</h5>
      <div class="card-body">
      <h5 class="card-title">AWS and IA
    </h5>
      <p class="card-text">
        <br/>
      <button type="button" class="btn btn-outline-warning btn-rounded" data-mdb-ripple-color="dark">In progress</button>
      </p>
      <br/>
      
      <hr/>
      <p><img src={aws} style ={{height : "40px"}}class="img-fluid" /></p>
      </div>
    </div>

    </div>
    <br/>
    <br/>
   
    </React.StrictMode>
  );
}

export default InProgress;
