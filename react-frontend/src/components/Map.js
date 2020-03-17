import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 31.0346172,
      lng: -96.7452876
    },
    zoom: 7.49
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
     <div style={{ height: '93.7vh', width: '70%', display: 'inline-block'  }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDk5zS4teB6rs0CKgbL_ptbxRhekDGMuig"}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>

    );
  }
}
 
export default SimpleMap;