import generateCoords from './generate-coordinates';

const demoCentres = generateCoords({ lat: 5.617750669708498, lng: -0.177871130291502 }, 16000, 10);

const places = demoCentres.map((place, index) => {
  return {
    id: index,
    title: `Center ${String.fromCharCode(65 + index)}`,
    position: { lat: place.lat, lng: place.lng },
    hasPool: Math.random() >= 0.5,
    hasGym: Math.random() >= 0.5,
    hasTennis: Math.random() >= 0.5
  }
});

export default places;