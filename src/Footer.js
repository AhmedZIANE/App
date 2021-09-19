import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Contact from './Contact';
import Navbar from './Navbar';
import Home from './Home';
import Projects from './Projects';
import Accomplishments from './Accomplishments';

function Footer() {
  return (
    <footer class="text-center text-white" style={{backgroundColor: "#f1f1f1"}}>
 
  <div class="container pt-4">
   
    <section class="mb-4">
      
      <a
        class="btn btn-link btn-floating btn-lg text-dark m-1"
        href="https://twitter.com/Ahmed58092938"
        role="button"
        data-mdb-ripple-color="dark"
        ><i class="fab fa-twitter"></i></a>

      
      <a
        class="btn btn-link btn-floating btn-lg text-dark m-1"
        href="https://www.linkedin.com/in/ahmedziane/"
        role="button"
        data-mdb-ripple-color="dark"
        ><i class="fab fa-linkedin"></i
      ></a>
      
      <a
        class="btn btn-link btn-floating btn-lg text-dark m-1"
        href="https://github.com/AhmedZIANE"
        role="button"
        data-mdb-ripple-color="dark"
        ><i class="fab fa-github"></i
      ></a>
      <a
        class="btn btn-link btn-floating btn-lg text-dark m-1"
        href="https://ahmed-ziane.medium.com/"
        role="button"
        data-mdb-ripple-color="dark"
        ><i class="fab fa-medium-m"></i
      ></a>
    </section>
    
  </div>
 
  <div class="text-center text-dark p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2);"}}>
    © 2021 Copyright : 
    <a class="text-dark" href="https://www.ahmed-ziane.com/"> Ahmed ZIANE</a>
  </div>
  
</footer>
  );
}

export default Footer;
