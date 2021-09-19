import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Contact from './Contact';
import Navbar from './Navbar';
import Home from './Home';
import Projects from './Projects';
import Accomplishments from './Accomplishments';
import Footer from './Footer';
import Clustering from './Clustering';

function App() {
  return (
    <Router>
      <Navbar/>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/projects' exact={true} component={Projects}/>
          <Route path='/accomplishments' exact={true} component={Accomplishments}/>
          <Route path='/contact' exact={true} component={Contact}/>
          
        </Switch>
        <Route path='/projects/segmenting&clusteringNeighborhoods' component={Clustering}/>
        <Footer/>
    </Router>
  );
}

export default App;
