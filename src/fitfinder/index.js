import React, { useState, useEffect } from 'react';
import Map from './map';
import { grey } from 'ansi-colors';
import generateCentres from '../utils/generate-centres';

const FitFinder = () => {
  // Hold location input in state
  const [locationInput, setLocationInput] = useState('');
  // Hold location result in state 
  const [location, setLocation] = useState(null);
  // Hold generated places in state
  const [places, setPlaces] = useState(null);
  // Hold generated fitness centres in state
  const [fitnessCentres, setFitnessCentres] = useState(places);
  // Hold filter conditions in state
  const [filters, setFilters] = useState({
    hasGym: true,
    hasSwimmingPool: false,
    hasTennisCourt: false
  });
  // Hold selected fitness centre in state
  const [fitnessCentre, setFitnessCentre] = useState(null);

  // On component load, 
  useEffect(() => {
    // check if browser has navigator api
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        // Get location from browser
        const location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        // Update location state
        setLocation(location);
      })
    } else {
      // Browser does not support navigation
      // Set custom location (Accra Mall)
      const location = {
        lat: 5.622307,
        lng: -0.173286
      };
      setLocation(location);
    }
  }, []);

  // Handle filter input checkbox changes
  const handleFilter = e => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.checked
    });
    filterPlaces();
  }

  // Filter places when filter conditions change
  const filterPlaces = () => {
    const filteredCentres = places.filter(place => {
      return place.hasGym === filters.hasGym && place.hasSwimmingPool === filters.hasSwimmingPool && place.hasTennisCourt === filters.hasTennisCourt
    });
    setFitnessCentres(filteredCentres);
  }

  // Handle fitness centre selection
  const handleCentreSelection = id => {
    const place = places.find(place => place.id === id);
    setFitnessCentre(place);
  }

  // Handle location input - to save in state
  const handleLocationInput = e => {
    e.preventDefault();
    setLocationInput(e.target.value);
  }

  // Handle location search on button click
  const handleLocationSearch = () => {
    // Generate ten dummy places within 10miles of current location
    const places = generateCentres(location);
    setPlaces(places);
    setFitnessCentres(places);
  }

  return (
    <div className="container">
      <h1 className="display-4">FitFinder <span className="badge badge-secondary" style={{fontSize: '25px', verticalAlign: 'top'}}>Beta</span></h1>
      
      <p className="font-italic">Locate fitness centers around you...</p>
      <hr style={{ color: grey, backgroundColor: grey, height: 5}} />
      <div className="row">
        <div className="col-sm-4">
          <div className="">
            <label htmlFor="search" className="">Search by location</label>
            <div className="form-inline">
              <input type="text" className="form-control w-50 mr-2" id="search" placeholder="Enter location" onChange={handleLocationInput} />
  
              <button className="btn btn-primary btn-sm" onClick={() => handleLocationSearch()}>Use location</button>
            </div>
            <small id="" className="text-muted font-italic">For now we generate dummy centres when you click the button</small>
          </div>
          
          <div className="mt-4">
            <h4>Filters</h4>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="has_gym" name="hasGym" onChange={handleFilter} />
              <label className="form-check-label" htmlFor="has_gym">
                  Has a gym
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="has_swimming_pool" name="hasSwimmingPool" onChange={handleFilter} />
              <label className="form-check-label" htmlFor="has_swimming_pool">
                Has a swimming pool
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="has_tennis_court" name="hasTennisCourt" onChange={handleFilter} />
              <label className="form-check-label" htmlFor="has_tennis_court">
                Has tennis courts
            </label>
            </div>
          </div>

          {/* Results from button click */}
          <div className="mt-4">
            {
              fitnessCentres ? <div>
                <h4>Results</h4>
                {
                  fitnessCentres.map(place => (
                    <div className="card mb-2" style={{ width: "18rem" }} key={place.id}>
                      <div className="card-body" onClick={() => handleCentreSelection(place.id)}>
                        <h5 className="card-title">{place.title}</h5>
                        <p className="card-text">{place.address}</p>
                        <p className="card-text small text-muted">{`${place.hasGym ? 'Gym ' : ''}${place.hasSwimmingPool ? '| Swimming pool ' : ''}${place.hasTennisCourt ? '| Tennis court' : ''}`}</p>
                      </div>
                    </div>
                  ))
                }
              </div> : ''
            }
            
            </div>

        </div>

        {/* Map is renderd here when location exists */}
        <div className="col-sm-8 map-div">
          {
            location ? <Map
              places={fitnessCentres}
              place={fitnessCentre}
              location={location}
            // search={{input: 'Accra'}}
            /> : <p className="lead">Map will load here...</p>
          }
        </div>
      </div>
    </div>
  );
}

export default FitFinder;