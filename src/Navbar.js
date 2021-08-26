import {
  BrowserRouter as Router,
  Link,
} from 'react-router-dom';

import Home from './Home';
import Contact from './Contact';
import './Navbar.css';

function Navbar() {
  return (
    
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
   
    <button
      class="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>

    
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      
      <a class="navbar-brand mt-2 mt-lg-0" >
      <Link to='/' style={{color:"white"}}>
      AhmedZIANE
      </Link>
      </a>
      
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
        <a class="nav-link" id="url">
          	<Link to='/' style={{color:"white"}}>Home</Link>
        </a>
        </li>
        <li class="nav-item">
          
          <a class="nav-link"  id="url">
          <Link to='/projects' style={{color:"white"}}> Projects</Link>

          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link"  id="url"><Link to='/accomplishments' style={{color:"white"}}>Accomplishments</Link></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="url">
            <Link to='/contact' style={{color:"white"}}> Contact</Link>
          </a>
        </li>
        
      </ul>
      
    </div>
    
    <div class="d-flex align-items-center">
      
      <a class="text-reset me-3" href="https://www.linkedin.com/in/ahmed-ziane-649282147/">
        
        <i class="fab fa-linkedin" style={{color:"white"}}></i>
      </a>
      
      <a class="text-reset me-3" href="https://twitter.com/Ahmed58092938">
        
        <i class="fab fa-twitter" style={{color:"white"}}></i>
      </a>
      <a class="text-reset me-3" href="https://github.com/AhmedZIANE">
        <i class="fab fa-github" style={{color:"white"}}></i>
        
      </a>
    </div>
  </div>
    </nav>
    
  );
}

export default Navbar;
