import React, {useState} from 'react';
import Map from './map';
import { grey } from 'ansi-colors';
import places from '../utils/generate-places';

const FitFinder = () => {
  const [fitnessCentres, setFitnessCentres] = useState(places);
  const [filters, setFilters] = useState({
    hasGym: true,
    hasSwimmingPool: false,
    hasTennisCourt: false
  });

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

  const handleCentreSelection = () => {
    console.log('card clicked');
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
            <input type="text" className="form-control w-50 mr-2" id="search" placeholder="Enter location" />
  
              <button className="btn btn-primary btn-sm">Use location</button>
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
            <h4>Results</h4>
            {
              fitnessCentres.map(place => (
                <div className="card mb-2" style={{ width: "18rem" }} key={place.id}>
                  <div className="card-body" onClick={handleCentreSelection}>
                    <h5 className="card-title">{place.title}</h5>
                    <p className="card-text">{place.address}</p>
                  </div>
                </div>
              ))
            }
            </div>

        </div>
        <div className="col-sm-8 map-div">
          <Map places={fitnessCentres} />
        </div>
      </div>
    </div>
  );
}

export default FitFinder;