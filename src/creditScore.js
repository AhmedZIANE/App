import React from 'react';
import './Home.css';

import credit from './img/credit.jpg';
import {
  BrowserRouter as Router,
  Link,
} from 'react-router-dom';

function Home() {
  return (
    <React.StrictMode>
    <div class="container" id="container">
    <section >
          <div class="row" >
            <div class="col-md-6 gx-5 mb-4" style={{marginTop:"6%"}}>
              <div class="bg-image hover-overlay ripple shadow-2-strong" data-mdb-ripple-color="light">
              <Link to="/projects/creditScore">
              <img src={credit} class="img-fluid" />
              </Link>
              </div>
            </div>

            <div class="col-md-6 gx-5 mb-4" style={{marginTop:"6%"}}>
            <Link to="/projects/creditScore">
              <h4 style={{color:"black"}}><strong>Credit score project</strong></h4>
              </Link>
              <p class="text-muted" >
                 A credit score is a numerical expression based on a level analysis of a person's credit files, to represent the creditworthiness of an individual.A credit score is primarily based on a credit report, information typically sourced from credit bureaus. In this project, we have used a Machine Learning approach to evaluate the potential risk posed by lending money to consumers and to mitigate losses due to bad debt and to determine who qualifies for a loan, at what interest rate, and what credit limits based on divers Data...
              </p>
              <br/>
            </div>
           </div>
        </section>
      <br/>
      <p>
            « Achetez maintenant, payez plus tard » : voilà une offre tentante que font bien 
des établissements financiers et commerciaux afin d'attirer de nouveaux 
clients. Toutefois, les deux parties doivent être conscientes des risques 
encourus dans le cadre d'un crédit. Il est important pour le prêteur 
comme pour l'emprunteur que le client soit capable de respecter son 
engagement et donc de rembourser ce qu'il doit pour son achat avant 
l'échéance du prêt. Les prêteurs doivent pouvoir évaluer le risque de 
défaut de paiement pour chaque client afin de décider à qui accorder un 
crédit.
Les avancées technologiques permettent aux établissements financiers de 
réduire les risques encourus à l'aide de diverses informations concernant 
les clients. Des méthodes statistiques et des techniques d'apprentissage 
automatique permettent d'analyser les données disponibles et de les 
résumer à une valeur unique, le score de risque de crédit. Cette valeur 
guide le processus de décision. Plus le score est élevé, plus le prêteur est 
sûr que le client mérite sa confiance. Le Credit Scoring est une forme 
d'intelligence artificielle basée sur la modélisation prédictive. Il évalue la 
probabilité d'un défaut de paiement, d'un retard de remboursement, ou 
même de l'insolvabilité du client. Le modèle prédictif « apprend » en 
comparant les données accumulées sur un client à celles d'un groupe de 
de clients similaires et à d'autres données pour prédire la probabilité que 
ce client ait un comportement spécifique à l'avenir.

            </p>
           

    </div>
    </React.StrictMode>
  );
}

export default Home;
