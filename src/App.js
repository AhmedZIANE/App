import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Contact from './Contact';
import Navbar from './Navbar';
import Home from './Home';
import Projects from './Projects';
import Accomplishments from './Accomplishments';
import Footer from './Footer';
import Clustering from './Clustering';
import HostingProject from './HostingProject';
import HostingProjectP2 from './HostingProjectP2';
import HostingProjectP3 from './HostingProjectP3';
import HostingProjectP4 from './HostingProjectP4';


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
        <Route path='/projects/segmenting&clusteringNeighborhoods' exact={true} component={Clustering}/>
        <Route path='/projects/hosting' exact={true} component={HostingProject}/>
        <Route path='/projects/hosting/part2' exact={true} component={HostingProjectP2}/>
        <Route path='/projects/hosting/part3' exact={true} component={HostingProjectP3}/>
        <Route path='/projects/hosting/part4' exact={true} component={HostingProjectP4}/>
        <Footer/>
    </Router>
  );
}

export default App;
