import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import previousData from '../data/17-Mar-2020corona-data.json'

import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyDk5zS4teB6rs0CKgbL_ptbxRhekDGMuig");
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
    fetch('http://localhost:5000')
    .then(res => res.json())
    .then(data => {
      this.setState({
        data: data
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
    function search(county){
      for(var i =0; i < dataCopy2.length; i++){
        if(county === dataCopy2[i].county){
          return dataCopy2[i].number;
        }
      }

    }
    
    
    

    const style = {
      width: '70%',
      height: '100%',
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
                <span className = "number">{search(this.state.selectedPlace.name)} </span> <span>cases</span>
                <span className = "info_compared">() </span>
           </div>
         </InfoWindow>
 
        
      </Map>

      
    );
    
  }
  
}
export default GoogleApiWrapper({
    apiKey: ("AIzaSyDk5zS4teB6rs0CKgbL_ptbxRhekDGMuig")
})(GoogleMapsContainer)