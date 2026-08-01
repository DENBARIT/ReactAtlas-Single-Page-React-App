import styles from "./Map.module.css";
import { useSearchParams, useNavigate} from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function Map(){
  const [searchParams] = useSearchParams();
  const navigate=useNavigate();
//   const lat = Number(searchParams.get("lat"));
//   const lng = Number(searchParams.get("lng"));
//   const mapPosition = Number.isFinite(lat) && Number.isFinite(lng) ? [lat, lng] : [40, 0];
const mapPosition = [40, 0];
   
   
  
   return (<div  className={styles.mapContainer}>
{/*    <div  className={styles.mapContainer} onClick={()=>navigate("form")}> */}
       {/* <h1>Map</h1> */}
       {/* <h1>Position: {lat}, {lng}</h1> */}
       {/* <button onClick={()=>setSearchParams({lat:30,lng:40})} >
Change position
       </button> */}
        <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    <Marker position={mapPosition}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
    </div>)
}
export default Map;