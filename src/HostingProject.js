import React from 'react';
import './Jupyter/css/pygments/notebook/colorful.css';
import './Jupyter/css/notebook.css';
import './Jupyter/css/main.css';
import mapT from './img/mapT.PNG';
import react from './img/react.png';
import flask from './img/flask.png';
import mongo from './img/mongo.png';
import aws from './img/aws.png';
import ARE from './img/ARE.PNG';
import under_construction from './img/under_construction.jpg';
import reactFlask from './img/reactFlask.webp';
import can_after_clustering from './img/can_after_clustering.PNG';
import {
  BrowserRouter as Router,
  Link,
  useRouteMatch,
} from 'react-router-dom';


function HostingProject() {
  const {url, path} = useRouteMatch();
  return (
    <React.StrictMode>
    <div class="container" style={{color:"black", marginTop : "100px;"}}>
    
    <section>
      <div class="row">
        <div class="col-md-12 gx-5 mb-4" style={{marginTop:"6%"}}>
          <h4 >
      <strong>Hosting React + Flask + MongoDB Web Application on AWS
        
      </strong>
      </h4>
      <br/>
      <br/>
      <p class="text-muted">
      An introduction to hosting web application, explained through architecture diagram.
      </p>
      <br/>
      
      <img src={ARE} class="img-fluid" width = "1200px;"/>
      <p class="text-muted">
      <br/>
      <br/>
      <br/>
      This is a 4 part blog of articles. Here, you will learn the basic concepts of AWS, Nginx and Gunicorn servers and how to use them to host your React + Flask + MongoDB Web Application.
      This is the first part of the Blog series, presenting an introduction and a system design overview of what and how we will achieve this. The next 3 series will be (in order of implementation necessities):
      </p>


<br/>
<br/>

<ul>
  <li>
  <Link to={`${url}/part2`} style = {{color : "black"}}>
  <strong>Part 2 : </strong>Setting up AWS VPC and Subnets
  </Link>
  
  </li>
  <br/>
  <li>
  <Link to={`${url}/part3`} style = {{color : "black"}}>
  <strong>Part 3 : </strong>Hosting Database
  </Link>
  </li>
  <br/>
  <li>
  <Link to={`${url}/part3`} style = {{color : "black"}}>
  <strong>Part 4 : </strong> Hosting Web Application
  </Link>
  </li>
  <br/>
</ul>
      
  
</div>
</div>


<br/>
<strong>A little history 😛</strong>
<br/>
<br/>
<p class="text-muted">
<strong >In the beginning was the monolith</strong>
</p>

<p >
Amazon was created in 1994, and until 2001, the organization of its IT services was still based on a monolith, that is to say an application designed as a single block offering the different functionalities necessary for the activity. of Amazon at the time: online sales.
As Amazon grew, it realized that a certain inertia had taken hold of its structure, and hindered the process of continuous innovation. It was necessary to regain flexibility within the IT teams, and therefore, to think about something different from a monolithic service application, while continuing to meet business needs.
<br/>
<br/>
The basic idea is then to cut the monolith which was Amazon's online sales site, into dozens of mini-applications; for example : <strong>delivery, order management, billing, research...</strong>
<br/>
<br/>
This is called service-oriented architecture. However, to be able to set up such a galaxy of microservices, the organization of the teams had to evolve.

<br/>

In the 2000s, the very organization of Amazon teams was not adapted to work with hundreds of applications. To allow fluid exchanges, the organization of the teams had to evolve. This is where the concept of the Product team emerges. Previously, the teams were divided into a fairly classic pattern : <strong>business teams, developers, testers, support function.</strong>

<br/>
<br/>
Small and cross-functional teams make it possible to considerably speed up the time between the phase of identifying the need and putting it into production, what in development is called the <i>time to market.</i> Communication is also facilitated.
<br/>
All the teams then organized themselves as service providers for other teams, from the development of the website to the management of the infrastructure consumed by the developers.
<br/>
<br/>
And suddenly… <strong>Amazon Web Services </strong> an on-demand cloud computing platforms and APIs.

<br/>
<br/>
Gradually, the idea of ​​starting to sell their own “internal service” infrastructure as a service that the public could consume, emerges; so much so that in 2006, Amazon publicly launched the first version of Amazon Web Services (also called AWS), with basic services such as:
<ul>
<br/>
  <li>
    
  Unlimited and on-demand storage with S3 (for Simple Storage Service);
  </li>
  <li>
  Message queues with SQS (for Simple Queue Service);
  </li>
  <li>
  On-demand machines with EC2 (for Elastic Compute Cloud).
  </li>
</ul>

<br/>
Even today, AWS improves and launches new services every year. [Source: Bloomberg]
</p>
<br/>

<p>
  <strong>Underst o_O d, but what is the advantages of the cloud ? 🙄</strong>

  <br/>
  <br/>
  The cloud offers several advantages to the companies and individuals who use it. The possibility of consuming the infrastructure as a service allows greater adaptability to change, and makes it possible to adapt the resources consumed to the real activity of your company.
  <br/>
  <ul>
    <br/>
    <li>
    <strong >Accessibility :</strong> In the cloud, data will always be accessible wherever your users are, thanks to the provider's global network.
    </li>
    <br/>
    <li>
    <strong>Adaptability :</strong> resources in the cloud are on demand, you can request more or less power depending on your needs.
    </li>
    <br/>
    <li>
    <strong>Speed: </strong>resources are made available to you almost immediately.
    </li>
    <br/>
    <li>
    <strong>Cost reduction : </strong>because the machines in the cloud are shared, the cloud provider can make significant economies of scale, which it re-impacts on the price of the service, allowing significant gains compared to what you could have with your own data center.
    </li>
    <br/>
    <li>
    <strong>Security :</strong> In the cloud, you will have the ability to encrypt your data easily and on the fly.

    </li>
  </ul>
<br/>
  <strong >
    Sources :</strong> <br/><br/>
    <a href='https://openclassrooms.com/fr/courses/2035756-deployez-vos-systemes-et-reseaux-dans-le-cloud-avec-aws/6110137-decouvrez-la-philosophie-des-services-aws'>https://openclassrooms.com/</a> 
    <br/>
    <a href='https://aws.amazon.com/'>https://aws.amazon.com/</a>

<br/>



<br/>
<br/>

<h4><strong>So let’s dive now into the interesting stuff 😋</strong></h4>
<br/>
<br/>
To deploy and host a web application on AWS, we would need a Virtual Private Cloud (VPC) which will provide the network connecting EC2 virtual machines containing the servers.

The VPC will have two subnets — private and public subnet.

The database will be deployed on an EC2 machine in the private subnet to prevent users from accessing the DB.

The front-end and back-end will be deployed on an EC2 machine in a public subnet. The front-end and back-end will be hosted and will be accessible to the users. Actually, users shouldn’t access the back-end too, but I am getting ahead, we will see how to achieve that too.
<br/>
Nginx server will be used to deploy React Application as a front-end and Gunicorn server will be used to deploy Python Flask Application as back-end. <br/><br/>PS : There is another alternative using AWS Amplify for hosting the front-end and a serverless computing service for the backend AWS Lambda, flask in this case which will be very benefical since we will not pay for resources except when they are used, but we will not see it in this demo 😕, but who know we may see it here in the futur 😉.
<br/>
<br/>
I will be deploying my personal website project as an example. So let’s jump to the next blog — <strong><Link to={`${url}/part2`} style = {{color : "black"}}> Part 2: Setting up AWS VPC and Subnet</Link></strong>
<br/>
<br/>
<br/>
<br/>

</p>



        </section>

    </div>
    
    </React.StrictMode>
  );
}

export default HostingProject;
