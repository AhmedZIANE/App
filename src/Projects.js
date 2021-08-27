import React from 'react';
import './Projects.css';

import credit from './img/credit.jpg';
import currency from './img/currency.jpg';
import tweet from './img/tweet.jpg';
import book from './img/book.jpg';
import camion from './img/camion.jpg';
import Popup from './Popup';
import {
  BrowserRouter as Router,
  Link,
} from 'react-router-dom';

function Projects() {
  return (
    <React.StrictMode>
      <div style={{backgroundColor:"black", marginTop:"-50px"}}>
        
      <main class="mt-5" >
      <div class="container">
        <section >
          <div class="row" >
            <div class="col-md-6 gx-5 mb-4" style={{marginTop:"6%"}}>
              <div class="bg-image hover-overlay ripple shadow-2-strong" data-mdb-ripple-color="light">
                
              <a href="" data-mdb-toggle="modal" data-mdb-target="#exampleModal" >
              <img src={credit} class="img-fluid" />
              </a>
                
              </div>
            </div>

            <div class="col-md-6 gx-5 mb-4" style={{marginTop:"6%"}}>
            <a href="" data-mdb-toggle="modal" data-mdb-target="#exampleModal" >
              <h4 style={{color:"white"}}><strong>Credit score project</strong></h4>
              </a>
              <p class="text-muted" >
                 A credit score is a numerical expression based on a level analysis of a person's credit files, to represent the creditworthiness of an individual.A credit score is primarily based on a credit report, information typically sourced from credit bureaus. In this project, we have used a Machine Learning approach to evaluate the potential risk posed by lending money to consumers and to mitigate losses due to bad debt and to determine who qualifies for a loan, at what interest rate, and what credit limits based on divers Data...
              </p>
              <a href="" data-mdb-toggle="modal" data-mdb-target="#exampleModal" >
                Continue reading
              </a>
              <br/>
            </div>
           </div>
        </section>

        <hr class="my-5" />
        <section>
          <div class="row">
            <div class="col-md-6 gx-5 mb-4">
            <a href="" data-mdb-toggle="modal" data-mdb-target="#exampleModal" >
              <h4 style={{color:"white"}}><strong>Manual exchange automation</strong></h4>
              </a>
              <p class="text-muted">
                 In order to improve its performance, guarantee the satisfaction of its customers as well as to promote its competitive position, the Banque Populaire Group was launched with a
digital transformation program which aims to orient its customers towards online services.
 The manual exchange service (purchase and sale of Foreign Bank Notes (BBE)) is
still among the services that are carried out entirely in the presence of the client in
the bank. The objective of this project was thus to realize a web application in order to make this
service accessible directly by the customer via Internet.
              </p>
              <a href="" data-mdb-toggle="modal" data-mdb-target="#exampleModal" >
                Continue reading
              </a>
            </div>
              <div class="col-md-6 gx-5 mb-4">
              <div class="bg-image hover-overlay ripple shadow-2-strong" data-mdb-ripple-color="light">
              <a href="" data-mdb-toggle="modal" data-mdb-target="#exampleModal" >
                <img src={currency} class="img-fluid" />
              </a>
                
              </div>
            
            </div>
          </div>
        </section>
        <hr class="my-5" />
        <section>
          <div class="row">
            <div class="col-md-6 gx-5 mb-4">
              <div class="bg-image hover-overlay ripple shadow-2-strong" data-mdb-ripple-color="light">
              <a href="" data-mdb-toggle="modal" data-mdb-target="#exampleModal" >
                <img src = {tweet} class="img-fluid" />
              </a>
                
              </div>
            </div>

            <div class="col-md-6 gx-5 mb-4">
            <a href="" data-mdb-toggle="modal" data-mdb-target="#exampleModal" >
              <h4 style={{color:"white"}}><strong>Tweets classification</strong></h4>
              </a>
              <p class="text-muted">
                 Text classification algorithms are at the heart of a variety of software systems that process text data at scale. Email software uses text classification to determine whether incoming mail is sent to the inbox or filtered into the spam folder. Discussion forums use text classification to determine whether comments should be flagged as inappropriate. In this project, we have used Python as a main tool to predict weather tweets are in the politic or in the sport field.
              </p>
              <a href="" data-mdb-toggle="modal" data-mdb-target="#exampleModal" >
                Continue reading
              </a>
            </div>
          </div>
        </section>
        <hr class="my-5"/>
        <section>
          <div class="row">
            

            <div class="col-md-6 gx-5 mb-4">
            <a href="" data-mdb-toggle="modal" data-mdb-target="#exampleModal" >
              <h4 style={{color:"white"}}><strong>Book recommendation</strong></h4>
              </a>
              <p class="text-muted">
                 A recommender system, or a recommendation system (sometimes replacing 'system' with a synonym such as platform or engine), is a subclass of information filtering system that seeks to predict the "rating" or "preference" a user would give to an item. In this project, we have developed a web application that propose to its users which books they can take based on their previous read.
              </p>
              <a href="" data-mdb-toggle="modal" data-mdb-target="#exampleModal" >
                Continue reading
              </a>
            </div>
              <div class="col-md-6 gx-5 mb-4">
              <div class="bg-image hover-overlay ripple shadow-2-strong" data-mdb-ripple-color="light">
              <a href="" data-mdb-toggle="modal" data-mdb-target="#exampleModal" >
                <img src={book} class="img-fluid" />
              </a>
                
              </div>
            
            </div>
          </div>
        </section>
        <hr class="my-5"/>
        <section>
          <div class="row">
            <div class="col-md-6 gx-5 mb-4">
              <div class="bg-image hover-overlay ripple shadow-2-strong" data-mdb-ripple-color="light">
              <a href="" data-mdb-toggle="modal" data-mdb-target="#exampleModal" >
                <img src={camion} class="img-fluid" />
              </a>
              </div>
            </div>

            <div class="col-md-6 gx-5 mb-4" >
            <a href="" data-mdb-toggle="modal" data-mdb-target="#exampleModal" >
              <h4 style={{color:"white"}}><strong>Predictive maintenance truck breakdown</strong></h4>
              </a>
              <p class="text-muted" style={{color:"white"}}>
                 Predictive maintenance holds the potential to help fleets prevent vehicle breakdowns while reducing upkeep costs by predicting when parts will fail based on performance data and other information. ... In fact, trucks are generating so much data that the costs of storing and transferring it can be prohibitive. So we have developed some Machine Learning algorithms that predict camions state and performances. 
              </p>
              <a href="" data-mdb-toggle="modal" data-mdb-target="#exampleModal" >
                Continue reading
              </a>
            </div>
          </div>
        </section>
        <hr class="my-5"/>
        
      </div>
</main>
<Popup/>
      </div>
    </React.StrictMode>
  );
}

export default Projects;
