import React from 'react';
import './Home.css';
import ahmed from './img/ahmed.png';
import Navbar from './Navbar';
import Popup from './Popup';

function Home() {
  return (
    <React.StrictMode>
    <div class="container" id="container">
        <img id = "img1" src={ahmed} />
        <br/>
        <br/>

        <h4>Hi! I'm Ahmed, I'am a Computer Science Engineer, graduated from Mohammadia School of Engineers, Morocco. I'am passionate about machine learning, statistics, programming, project management, and many further Computer Science related fields. </h4>
        <br/>
        <br/>
        <br/>
        <Popup/>
    </div>
    </React.StrictMode>
  );
}

export default Home;
