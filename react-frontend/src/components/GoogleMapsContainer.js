import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import axios from 'axios';


class GoogleMapsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      data:[],
      county : []
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
    })
    .catch(err => console.error(err));
    
    
}

  render() {
    


    function geolat(loc){
      axios.get("https://maps.googleapis.com/maps/api/geocode/json",{
        params:{
          address:loc,
          key : "AIzaSyDk5zS4teB6rs0CKgbL_ptbxRhekDGMuig"
          
        }
      })
      .then(function(response){
        console.log(response)
          var lat = response.data.results[0].geometry.location.lat;
          console.log(lat)
        
        return lat;
      })
      
    }
    
    function geolng(loc){
      axios.get("https://maps.googleapis.com/maps/api/geocode/json",{
        params:{
          address:loc,
          key : "AIzaSyDk5zS4teB6rs0CKgbL_ptbxRhekDGMuig"
          
        }
      })
      .then(function(response){
        console.log(response)
        var lng = response.data.results[0].geometry.location.lng;
        console.log(lng)
        return lng;
      })
      
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
        <Marker
          onClick={this.onMarkerClick}
          name={'Kenyatta International Convention Centre'}
        />
        
        {/* 이 밑에 부분이 안되요 ㅠㅠㅠㅠㅠ */}
        {this.state.data.map((data, i) =>
           <Marker key={i}
           onClick = { this.onMarkerClick }
           title = {data.county+ " county"}
           position =  {{ lat : geolat(data.county+" county|texas"), lng : geolng(data.county+" county|texas")}}
           name = {data.county}
           />
         )
         }


        <InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
        >
          <div> <h4>아니씨뿌레꺼 왜 안되냐아오</h4>

          </div>
        </InfoWindow>
      </Map>

      
    );
  }
  
}
export default GoogleApiWrapper({
    apiKey: ("AIzaSyDk5zS4teB6rs0CKgbL_ptbxRhekDGMuig")
})(GoogleMapsContainer)