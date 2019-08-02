/**
 * Generate ten dummy fitness centers 10miles (16000meters) around given location
 */

import generateCoords from './generate-coordinates';

/**
 * 
 * @param {Object} location - Location for which random coordinates will be generated.
 * @param {Number} location.lat - Latitude coordinate
 * @param {Number} location.lng - Longitude coordinate
 */
const generateCentres = location => {
  // Generate 10 random coordinates 16000meters around location
  const demoCentres = generateCoords(location, 16000, 10);

  // Contruct place object with generated data
  const places = demoCentres.map((place, index) => {
    return {
      id: index,
      title: `Center ${String.fromCharCode(65 + index)}`,
      position: { lat: place.lat, lng: place.lng },
      hasSwimmingPool: Math.random() >= 0.5,
      hasGym: Math.random() >= 0.5,
      hasTennisCourt: Math.random() >= 0.5,
      address: `${1 + index} Test Street, Westerof`
    }
  });

  return places;
  
}

export default generateCentres;