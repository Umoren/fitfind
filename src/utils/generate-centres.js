import generateCoords from './generate-coordinates';

const generateCentres = location => {
  const demoCentres = generateCoords(location, 16000, 10);

  const places = demoCentres.map((place, index) => {
    return {
      id: index,
      title: `Center ${String.fromCharCode(65 + index)}`,
      position: { lat: place.lat, lng: place.lng },
      hasSwimmingPool: Math.random() >= 0.5,
      hasGym: true,
      hasTennisCourt: Math.random() >= 0.5,
      address: `${1 + index} Test Street, Westerof`
    }
  });

  return places;
  
}

export default generateCentres;