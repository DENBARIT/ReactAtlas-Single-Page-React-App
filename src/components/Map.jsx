import styles from "./Map.module.css";
import { useMap } from "react-leaflet";
import { useEffect,useState } from "react";
import { useSearchParams, useNavigate} from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup,useMapEvents } from 'react-leaflet'
import { useCities } from "../CitiesContext/CitiesContext";
import { useGeolocate } from "../Hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../Hooks/useUrlPosition";
function Map(){
const {cities}= useCities();
  
  const {isLoading:isLoadingPosition,position:geolocationPosition,getPosition,error}=useGeolocate();
  const [mapLat, mapLng] = useUrlPosition();
  // const mapPosition = Number.isFinite(mapLat) && Number.isFinite(mapLng)
  //   ? [mapLat, mapLng]
  //   : geolocationPosition
  //     ? [geolocationPosition.lat, geolocationPosition.lng]
  //     : [40, 0];
    const [mapPosition, setMapPosition] = useState([40, 0]);

useEffect(function() {
    if (Number.isFinite(mapLat) && Number.isFinite(mapLng)) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);
useEffect(function() {
    if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }
  }, [geolocationPosition]);




   return (<div  className={styles.mapContainer}>

      {!geolocationPosition && (
        <Button onClick={getPosition} type="position" >
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      {error && <p>{error}</p>}
        <MapContainer 
        center={mapPosition}
        zoom={6} scrollWheelZoom={true} className={styles.map}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
  { cities.map(city => (
    <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
      <Popup>
       <span>{city.emoji}</span>
       <span>{city.cityName}</span>

      </Popup>
    </Marker>) )
    }
    <ChangeCenter position={mapPosition} />
    <DetectClick />
  </MapContainer>
    </div>)
}
function ChangeCenter({position}){
    const map=useMap();
  useEffect(function(){
    map.setView(position);
  }, [map, position]);
return null;
}
function DetectClick(){
  const navigate=useNavigate();

  useMapEvents({
    click:(e)=>{
      const {lat,lng}=e.latlng.wrap();
      navigate(`form?lat=${lat}&lng=${lng}`);
    }
  });
  return null;
}
export default Map;