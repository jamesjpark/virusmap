import React, {Component} from 'react';
import Navbar from "./components/Navbar"
import Map from "./components/Map"
import Numbers from "./components/Numbers"
import logo from './logo.svg';
import './App.css';
import GoogleMapsContainer from "./components/GoogleMapsContainer"
class App extends Component{
  
  render(){
  return (
    <div className = "App">
    <Navbar/>
    <GoogleMapsContainer className="map"/>

    
    <Numbers/>
   

    </div>

  );
}
}

export default App;
