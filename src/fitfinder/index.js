import React, {useState, useEffect} from 'react';
import Map from './map';
import { grey } from 'ansi-colors';
import generateCentres from '../utils/generate-centres';

const FitFinder = () => {
  const [locationInput, setLocationInput] = useState('');
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState(null);
  const [fitnessCentres, setFitnessCentres] = useState(places);
  const [filters, setFilters] = useState({
    hasGym: true,
    hasSwimmingPool: false,
    hasTennisCourt: false
  });
  const [fitnessCentre, setFitnessCentre] = useState(null);

  useEffect(() => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        // console.log('browser location', location);
        setLocation(location);
        // const places = generateCentres(location);
        // console.log('browser places', places);
        // setPlaces(places);
        // setFitnessCentres(places);
      })
    }
  }, []);

  const handleFilter = e => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.checked
    });
    filterPlaces();
  }

  const filterPlaces = () => {
    const filteredCentres = places.filter(place => {
      return place.hasGym === filters.hasGym && place.hasSwimmingPool === filters.hasSwimmingPool && place.hasTennisCourt === filters.hasTennisCourt
    });
    setFitnessCentres(filteredCentres);
  }

  const handleCentreSelection = id => {
    const place = places.find(place => place.id === id);
    setFitnessCentre(place);
  }

  const handleLocationInput = e => {
    e.preventDefault();
    setLocationInput(e.target.value);
  }

  const handleLocationSearch = () => {
    const places = generateCentres(location);
    setPlaces(places);
    setFitnessCentres(places);
  }

  return (
    <div className="container">
      <h1 className="display-4">FitFinder</h1>
      <hr style={{ color: grey, backgroundColor: grey, height: 5}} />
      <div className="row">
        <div className="col-sm-4">
          <div className="">
            <label htmlFor="search" className="">Search by location</label>
            <div className="form-inline">
            <input type="text" className="form-control w-50 mr-2" id="search" placeholder="Enter location" onChange={handleLocationInput} />
  
              <button className="btn btn-primary btn-sm" onClick={() => handleLocationSearch()}>Use location</button>
              </div>
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