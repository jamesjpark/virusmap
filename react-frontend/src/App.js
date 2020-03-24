import React, {Component} from 'react';
import Navbar from "./components/Navbar"
import Map from "./components/Map"
import Numbers from "./components/Numbers"
import logo from './logo.svg';
import './App.css';
import GoogleMapsContainer from "./components/GoogleMapsContainer"
import Graph2 from "./components/Graph2"
import Info from './components/Info';
class App extends Component{

  
  render(){
  return (
    <div className = "App">
    <Navbar/>
    <GoogleMapsContainer className="map"/>
    <Numbers/>
    <Graph2/>
    <Info/>
    
    
    

    
   

    </div>

  );
}
}

export default App;
