import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import previousData from '../data/25-Mar-2020corona-data.json'
import Geocode from "react-geocode";
require('dotenv').config()
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
Geocode.setApiKey(GOOGLE_API_KEY);
Geocode.enableDebug();

class GoogleMapsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      data:[],
      county : [],
      json: [],
      prev : previousData
    }
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    
    
  }
  
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  

  componentDidMount() {
    fetch('http://virus-backend-dev.us-east-2.elasticbeanstalk.com')
    .then(res => res.json())
    .then(data => {
      this.setState({
        data: data
      });var dataCopy = this.state.data;
      var prevCopy = this.state.prev;
      var j = 0;
      var prevTot = 0;
      var currTot = 0;
      for(var i = 0; i<dataCopy.length; i++){
        currTot += parseInt(dataCopy[i].number);
      }
      for(i = 0; i<prevCopy.length; i++){
       prevTot += parseInt(prevCopy[i].number);
     }
      var tot =  currTot-prevTot;
      console.log(tot)
      for( i =0; i<dataCopy.length; i++){
        dataCopy[i].prevNum = "+"+dataCopy[i].number;

        for( j = 0; j < prevCopy.length; j++){


          if(dataCopy[i].county === prevCopy[j].county){
            var tmp = dataCopy[i].number - prevCopy[j].number;
            if(tmp < 0){
              dataCopy[i].prevNum = "-"+tmp;

            }
            dataCopy[i].prevNum = "+"+tmp;


          }
        }
        
        
      }
   
   this.setState({
     data : dataCopy
   });
   this.setState({
     previousTotal : tot
   });
      const tmpdata = this.state.data
      var tmpjson = [];
      for (var i=0;i<=tmpdata.length;i++) {
        const address = tmpdata[i].county + "county, Texas"
        const name = tmpdata[i].county;
        const number = tmpdata[i].number;
        Geocode.fromAddress(address)
        .then(response => {
            const newEntry = {
              "name" : name,
              "number" : number, 
              "position": response.results[0].geometry.location
            };
            tmpjson.push(newEntry);

            this.setState({
              json: tmpjson
            });
          },
          error => {
            console.error(error);
          }
        );
      }
    
    })
    .catch(err => console.error(err));

    // for(i =0; i<this.state.)
    // const newData ={
    //   "number" : 
    // }

}

  render() {

    var dataCopy2 = this.state.data;


    console.log(dataCopy2);
    function searchNum(county){
      for(var i =0; i < dataCopy2.length; i++){
        if(county === dataCopy2[i].county){
          return dataCopy2[i].number;
        }
      }

    }
    
    function searchCom(county){
      for(var i =0; i < dataCopy2.length; i++){
        if(county === dataCopy2[i].county){
          return dataCopy2[i].prevNum;
        }
      }

    }
    
    function searchDeath(county){
      for(var i =0; i < dataCopy2.length; i++){
        if(county === dataCopy2[i].county){
          return dataCopy2[i].death;
        }
      }
    }
    
    
    

    const style = {
      width: '100%',
      height: '94.7vh',
      display :'inline-block'

    }
    return (

        <Map

        item
        xs = { 12 }
        style = { style }
        google = { this.props.google }
        onClick = { this.onMapClick }
        zoom = { 7 }
        initialCenter = {{ lat: 31.648209, lng: -96.711185 }}
      >
        
        
        {this.state.json.map((data, i) =>
           <Marker key={i}
           onClick = { this.onMarkerClick }
           title = {data.name}
           position =  {data.position}
           name = {data.name}
           />
         )}


           <InfoWindow 
           marker = { this.state.activeMarker }
           visible = { this.state.showingInfoWindow }
         >
           <div> <h4 className = "county">{this.state.selectedPlace.name} County</h4>
                <span >{searchNum(this.state.selectedPlace.name)} </span> <span>cases</span>
                <br></br>
                <span className = "info_compared">{searchCom(this.state.selectedPlace.name)} since 3 days ago</span>
                <br></br>
                <span className ="number">death : {searchDeath(this.state.selectedPlace.name)} </span>
           </div>
         </InfoWindow>
      </Map>
    );
    
  }
  
}
export default GoogleApiWrapper({
    apiKey: (GOOGLE_API_KEY)
})(GoogleMapsContainer)