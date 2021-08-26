import React from 'react';
import './Home.css';
import ahmed from './img/ahmed.png';
import Navbar from './Navbar';

function Popup() {
  return (
    <React.StrictMode>


<div
  class="modal fade"
  id="exampleModal"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Resource under construction</h5>
        <button
          type="button"
          class="btn-close"
          data-mdb-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">Sorry, the requested page is under constuction ! It will be ready soon. Thank you. </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-dark" data-mdb-dismiss="modal">
          Close
        </button>
      </div>
    </div>
  </div>
</div>
    </React.StrictMode>
  );
}

export default Popup;
