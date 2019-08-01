import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const MapContainer = props => {
  return (
    <Map
      google={props.google}
      zoom={11}
      style={mapStyles}
      initialCenter={{ lat: 5.617750669708498, lng: -0.177871130291502 }}
    >
      {
        props.places.map(place => (
          <Marker
            key={place.id}
            title={place.title}
            position={place.position}
          />
        ))
      }
    </Map>
  );
}
 
const mapStyles = {
  width: '100%',
  height: '100%',
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAPS_API_KEY
})(MapContainer)