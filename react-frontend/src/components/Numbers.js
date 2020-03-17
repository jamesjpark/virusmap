import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader';
import CSVReader from 'react-papaparse';

class Numbers extends Component {
    constructor(props){
        super(props);
        this.state = {
            confirmed : 11,
            tested : 80,
            death : 0,
            cured : 0,
            
            
        }
    }
  

  
    
  render() {
    return (
        <div className = "num">
            <h2>COVID-19 Cases in Texas</h2>
           <h2>Confirmed : {this.state.confirmed}</h2> 
           <h2>Tested : {this.state.tested}</h2> 
           <h2>Death : {this.state.death}</h2> 
           <h2>Cured : {this.state.cured}</h2> 
        </div>
    );
  }
}
 
export default Numbers;