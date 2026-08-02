import styles from "./Map.module.css";
import { useMap } from "react-leaflet";
import { useState,useEffect } from "react";
import { useSearchParams, useNavigate} from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup,useMapEvents } from 'react-leaflet'
import { useCities } from "../CitiesContext/CitiesContext";


function Map(){
  const [searchParams] = useSearchParams();
  // const navigate=useNavigate();
 const {cities}= useCities();
  const mapLat =Number(searchParams.get("lat"));
  const mapLng = Number(searchParams.get("lng"));
//   const mapPosition = Number.isFinite(lat) && Number.isFinite(lng) ? [lat, lng] : [40, 0];
// const [mapPosition,setMapPosition] = useState([40, 0]) ;
  const [mapPosition, setMapPosition] = useState(
    [40,0]);
useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);
  

   return (<div  className={styles.mapContainer}>
{/*    <div  className={styles.mapContainer} onClick={()=>navigate("form")}> */}
       {/* <h1>Map</h1> */}
       {/* <h1>Position: {lat}, {lng}</h1> */}
       {/* <button onClick={()=>setSearchParams({lat:30,lng:40})} >
Change position
       </button> */}
        <MapContainer 
        // center={mapPosition} 
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
map.setView(position);
return null;
}
function DetectClick(){
  const navigate=useNavigate();

  useMapEvents({
    click:(e)=>navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
});}
export default Map;