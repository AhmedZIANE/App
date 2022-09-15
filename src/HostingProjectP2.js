import React from 'react';
import './Jupyter/css/pygments/notebook/colorful.css';
import './Jupyter/css/notebook.css';
import './Jupyter/css/main.css';
import under_construction from './img/under_construction.png';
import {
  BrowserRouter as Router,
  Link,
  useRouteMatch,
} from 'react-router-dom';


function HostingProjectP2() {
  const {url, path} = useRouteMatch();
  return (
    <React.StrictMode>
    <div class="container">
    <img src={under_construction} class="img-fluid" />
    </div>
    </React.StrictMode>
  );
}

export default HostingProjectP2;
