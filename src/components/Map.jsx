import React, { useEffect, useState } from 'react';
import styles from './Map.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button';
import { useUrlPosition } from '../hooks/useUrlPosition';

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  //This useEffect hook will update the mapPosition state when the mapLat and mapLng values change otherwise, when the mapPosition is updated again, the map will not re-render the map with the new coordinates.
  useEffect(
    function () {
      if (mapLat && mapLng) {
        setMapPosition([mapLat, mapLng]);
      }
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geoLocationPosition) {
        setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
      }
    },
    [geoLocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button
          type="position"
          onClick={getPosition}>
          {isLoadingPosition ? 'Loading position...' : 'Use your position'}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        //centers the map to the coordinates provided in the URL
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map(city => (
          // Create a Marker component for each city in the cities array
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}>
            <Popup>{city.cityName}</Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

// this function will use the useMap hook provided by leaflet to change the center of the map to the coordinates provided in the URL
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

// this function will be called when the user clicks on the map. it uses the useMapEvents hook provided by leaflet  and the useNavigate hook provided by reactRouter to navigate to the form page when the user clicks on the map
function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: e => {
      // when the user clicks on the map, the latitude and longitude values of the clicked location are passed as query parameters to the form page
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
