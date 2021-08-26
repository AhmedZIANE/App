import React from 'react';
import './Home.css';
import ahmed from './img/ahmed.png';
import Navbar from './Navbar';
import Particles from 'react-particles-js';
import Footer from './Footer';

function Error() {
  return (
    <React.StrictMode>
    <div style={{backgroundColor:"black", position:"fixed"}}>
    <Particles  />
    <div class="container" style={{marginTop: "4%",textAlign: "center"}}>
    
    <h5>Sorry, the requested page is under constuction ! It will be ready soon. Thank you ! </h5>

    </div>
    </div>
    </React.StrictMode>
  );
}

export default Error;
