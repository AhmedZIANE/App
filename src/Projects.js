import React from 'react';
import './Projects.css';

import can_cluster from './img/can_cluster.PNG';
import currency from './img/currency.png';
import mywebsite from './img/mywebsite.PNG';
import textclass from './img/textclass.png';
import book from './img/book.png';
import camion from './img/camion.png';
import kmean from './img/kmean.png';
import Popup from './Popup';
import reactFlask from './img/reactFlask.webp'
import clustering from './img/clustering.gif'
import {
  BrowserRouter as Router,
  Link,
  useRouteMatch,
} from 'react-router-dom';

function Projects() {
  const {url, path} = useRouteMatch();
  return (
    <React.StrictMode>
      <div style={{backgroundColor:"white", marginTop:"-50px"}}>
        
      <main class="mt-5" >
      <div class="container">

      <section>
          <div class="row">
            <div class="col-md-6 gx-5 mb-4" style={{marginTop:"6%"}}>
            <Link to={`${url}/hosting`}>
              <h4 style={{color:"black"}}><strong>Hosting my website created using React, Flask and MongoDB on AWS</strong></h4>
              </Link>
              <p class="text-muted">
              One of the most important, frustrating, common and underrated tasks in web development is hosting the web service. Underrated for student developers, because they usually don’t come to the stage of building full-fledged applications to be used on a large scale and hence they don’t care much about hosting their web application projects. Underrated for professional developers working in big Companies, because they have dedicated automated scripts and tools that deploys and hosts their web services for them with few commands, for example, Walmart has OneOps and Amazon has AWS.
              </p>
              <Link to={`${url}/hosting`} style={{color:"black"}}>
                Continue reading
              </Link>
            </div>
              <div class="col-md-6 gx-5 mb-4" style={{marginTop:"6%"}}>
              <div  data-mdb-ripple-color="light">
              
              <Link to={`${url}/hosting`}>
                <img src={reactFlask} class="img-fluid" />
              </Link>
                
              </div>
            
            </div>
          </div>
        </section>
        <hr/>
        <section >
          <div class="row" >
            <div class="col-md-6 gx-5 mb-4" style={{marginTop:"6%"}}>
              <div data-mdb-ripple-color="light">
                
              
              <Link to={`${url}/segmenting&clusteringNeighborhoods`}>
              <img src={kmean} class="img-fluid" width = "480px;" />
              </Link>
            
              </div>
            </div>

            <div class="col-md-6 gx-5 mb-4" style={{marginTop:"6%"}}>
            
            <Link to={`${url}/segmenting&clusteringNeighborhoods`}>
            <h4 style={{color:"black"}}><strong>Segmenting and Clustering Neighborhoods in Toronto, Canada</strong></h4>
              </Link>
              <p class="text-muted" >
              In this project, we will convert addresses into their equivalent latitude and longitude values. Also, we will use the Foursquare API to explore neighborhoods in North York, an administrative district of Toronto. We will use the explore function to get the most common venue categories in each neighborhood, and then use this feature to group the neighborhoods into clusters. We will use the k-means clustering algorithm. Finally, we will use the Folium library to visualize the neighborhoods in Toronto, Canada and their emerging clusters.</p>
              <Link to={`${url}/segmenting&clusteringNeighborhoods`}>
              <span style={{color: 'black'}}>Continue reading</span>
              </Link>
              
              <br/>
            </div>
           </div>
        </section>

        <hr class="my-5" />
        <section>
          <div class="row">
            <div class="col-md-6 gx-5 mb-4">
            <a href="" data-mdb-toggle="modal" data-mdb-target="#exampleModal" >
              <h4 style={{color:"black"}}><strong>Manual exchange automation</strong></h4>
              </a>
              <p class="text-muted">
                 In order to improve its performance, guarantee the satisfaction of its customers as well as to promote its competitive position, the Banque Populaire Group was launched with a
digital transformation program which aims to orient its customers towards online services.
 The manual exchange service (purchase and sale of Foreign Bank Notes (BBE)) is
still among the services that are carried out entirely in the presence of the client in
the bank. The objective of this project was thus to realize a web application in order to make this
service accessible directly by the customer via Internet.
              </p>
              <a href="" data-mdb-toggle="modal" data-mdb-target="#exampleModal" style={{color:"black"}}>
                Continue reading
              </a>
            </div>
              <div class="col-md-6 gx-5 mb-4">
              <div  data-mdb-ripple-color="light">
              <a href="" data-mdb-toggle="modal" data-mdb-target="#exampleModal" >
                <img src={currency } width = "370px;" class="img-fluid" />
              </a>
                
              </div>
            
            </div>
          </div>
        </section>
        <hr class="my-5" />
        <section>
          <div class="row">
            <div class="col-md-6 gx-5 mb-4">
              <div  data-mdb-ripple-color="light">
              <a href="" data-mdb-toggle="modal" data-mdb-target="#exampleModal" >
                <img src = {textclass} class="img-fluid" />
              </a>
                
              </div>
            </div>

            <div class="col-md-6 gx-5 mb-4">
            <a href="" data-mdb-toggle="modal" data-mdb-target="#exampleModal" >
              <h4 style={{color:"black"}}><strong>Tweets classification</strong></h4>
              </a>
              <p class="text-muted">
                 Text classification algorithms are at the heart of a variety of software systems that process text data at scale. Email software uses text classification to determine whether incoming mail is sent to the inbox or filtered into the spam folder. Discussion forums use text classification to determine whether comments should be flagged as inappropriate. In this project, we have used Python as a main tool to predict weather tweets are in the politic or in the sport field.
              </p>
              <a href="" data-mdb-toggle="modal" data-mdb-target="#exampleModal" style={{color:"black"}}>
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
              <h4 style={{color:"black"}}><strong>Book recommendation</strong></h4>
              </a>
              <p class="text-muted">
                 A recommender system, or a recommendation system (sometimes replacing 'system' with a synonym such as platform or engine), is a subclass of information filtering system that seeks to predict the "rating" or "preference" a user would give to an item. In this project, we have developed a web application that propose to its users which books they can take based on their previous read.
              </p>
              <a href="" data-mdb-toggle="modal" data-mdb-target="#exampleModal" style={{color:"black"}}>
                Continue reading
              </a>
            </div>
              <div class="col-md-6 gx-5 mb-4">
              <div  data-mdb-ripple-color="light">
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
              <h4 style={{color:"black"}}><strong>Predictive maintenance truck breakdown</strong></h4>
              </a>
              <p class="text-muted" style={{color:"white"}}>
                 Predictive maintenance holds the potential to help fleets prevent vehicle breakdowns while reducing upkeep costs by predicting when parts will fail based on performance data and other information. ... In fact, trucks are generating so much data that the costs of storing and transferring it can be prohibitive. So we have developed some Machine Learning algorithms that predict camions state and performances. 
              </p>
              <a href="" data-mdb-toggle="modal" data-mdb-target="#exampleModal" style={{color:"black"}}>
                Continue reading
              </a>
            </div>
          </div>
        </section>
        <br/>
        <br/>
        
      </div>
</main>
<Popup/>
      </div>
    </React.StrictMode>
  );
}

export default Projects;