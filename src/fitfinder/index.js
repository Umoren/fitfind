import React from 'react';

import Map from './map';
import { grey } from 'ansi-colors';

import places from '../utils/generate-places';

console.log('places', places);

const FitFinder = () => {
  return (
    <div className="container">
      <h1 className="display-4">FitFinder</h1>
      <hr style={{ color: grey, backgroundColor: grey, height: 5}} />
      <div className="row">
        <div className="col-sm-4">
          <div className="">
            <label for="search" className="">Search by location</label>
            <div className="form-inline">
            <input type="text" className="form-control w-50 mr-2" id="search" placeholder="Enter location" />
  
              <button className="btn btn-primary btn-sm">Use location</button>
              </div>
          </div>
          
          <div className="mt-4">
            <h4>Filters</h4>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="has_gym" />
                <label className="form-check-label" for="has_gym">
                  Has a gym
  </label>
</div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="has_swimming_pool" />
              <label className="form-check-label" for="has_swimming_pool">
                Has a swimming pool
  </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="has_tennis_courts" />
              <label className="form-check-label" for="has_tennis_courts">
                Has tennis courts
            </label>
            </div>
          </div>

          <div className="mt-4">
            <h4>Results</h4>
            
            </div>

        </div>
        <div className="col-sm-8 map-div">
          <Map places={places} />
        </div>
      </div>
    </div>
  );
}

export default FitFinder;