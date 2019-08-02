import React from 'react';

const SearchResults = props => {
  
  if (props.fitnessCentres) {
    return (<div>
      
      {
        props.fitnessCentres.map(place => (
          <div className="card mb-2" style={{ width: "18rem" }} key={place.id}>
            <div className="card-body" onClick={() => props.handleCentreSelection(place.id)}>
              <h5 className="card-title">{place.title}</h5>
              <p className="card-text">{place.address}</p>
              <p className="card-text small text-muted">{`${place.hasGym ? 'Gym ' : ''}${place.hasSwimmingPool ? '| Swimming pool ' : ''}${place.hasTennisCourt ? '| Tennis court' : ''}`}</p>
            </div>
          </div>
        ))
      }
    </div>)
  } else {
    return <small id="" className="text-muted font-italic">Results will be listed here when they are available</small>
  }
  
}

export default SearchResults