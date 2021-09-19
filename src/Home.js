import React from 'react';
import './Home.css';
import ahmed from './img/ahmed.jpg';

function Home() {
  return (
    <React.StrictMode>
    <div class="container" id="container">
        <img id = "img1" src={ahmed} />
        <br/>
        <br/>
        <h5>Hi! I'm Ahmed ZIANE, welcome and thank you for your visit. I'am a Computer Science Engineer, graduated from Mohammadia School of Engineers, Morocco. I'am passionate about Science, new technologies,  traveling and learning new things. </h5>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
       
    </div>
    </React.StrictMode>
  );
}

export default Home;
