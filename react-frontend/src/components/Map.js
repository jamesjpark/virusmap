import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class SimpleMap extends Component {
  constructor(props){
    super(props);
    this.state = {
      data : []
    }
  }
  static defaultProps = {
    center: {
      lat: 31.0346172,
      lng: -96.7452876
    },
    zoom: 7
  };

  componentDidMount() {
    // 이 function이 리엑트가 렌더한다음 바로 무조건 돌아가는 펑션이야
    // 여기서 백서버에 요청을 해서 데이터를 가져오는 거지
    // 이렇게 하면 데이터를 따로 저장할 필요도 없고
    // 매번 가져올 때마다 데이터 서버에서 읽어오니까 항상 데이터도 최신이 되겠지
    fetch('http://localhost:5000')
    .then(res => res.json())
    .then(data => {
      this.setState({
        data: data
      });
      // 이렇게 해서 서버에서 받아온 데이터를 state 안에 data로 맵핑시키는거야
      // 그럼 state가 바뀌니까 render가 자동으로 돌아가게 되겠지? 그럼 페이지
      // 받아온 데이터가 보여질거고
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
    return (
      // Important! Always set the container height explicitly
     <div style={{ height: '93.7vh', width: '70%', display: 'inline-block'  }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDk5zS4teB6rs0CKgbL_ptbxRhekDGMuig"}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={31.955413}
            lng={-96.337844}
            text="My Marker"
          />
          {this.state.data.map((data, i) =>
           <AnyReactComponent key={i}
            lat = {geolat(data.county+" county|texas")}
            lng = {geolng(data.county+" county|texas")}
            text = "MARKER"
           />
         )
         }
        </GoogleMapReact>
      </div>

    );
  }
}
 
export default SimpleMap;