import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const MapContainer = props => {
  const { google, location } = props;
  // Testing for when search is implemented
  if (props.search) {
    const onMapReady = (mapProps, map) => {
      console.log('mpaProps', mapProps, '\nmap', map)
      searchLocation(map, map.center);
    }

    function searchLocation (map, center) {
      const service = new google.maps.places.PlacesService(map);
      service.textSearch({
        query: 'Uyo',
           
      }, (result, status) => {
          console.log('result', result[0].geometry.location);
          console.log('status', status);
      });
    }


    return (
      <Map
        google={google}
        onReady={onMapReady}
      />
    )
  }
  // When user has selected a single place
  else if (props.place) {
    return (
      <Map
        google={google}
        zoom={11}
        style={mapStyles}
      >
        <InfoWindow
          position={props.place.position}
          visible={true}
        >
          <div>
            <h5>{props.place.title}</h5>
            <p>{props.place.address}</p>
            <p className="small text-muted">{`${props.place.hasGym ? 'Gym ' : ''}${props.place.hasSwimmingPool ? '| Swimming pool ' : ''}${props.place.hasTennisCourt ? '| Tennis court' : ''}`}</p>
          </div>
        </InfoWindow>
      </Map>
    ); 
  }
  // When user has not yet searched for a place
  else if (location && !props.places) {
    return (
      <Map
        google={props.google}
        zoom={11}
        style={mapStyles}
        initialCenter={location}
      >
      </Map>
    );
  }
    // When user is searching for centres
  else {
    return (
      <Map
        google={props.google}
        zoom={11}
        style={mapStyles}
        initialCenter={location}
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
}

// Ensure map fits into parent div 
const mapStyles = {
  width: '100%',
  height: '100%',
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAPS_API_KEY
})(MapContainer)