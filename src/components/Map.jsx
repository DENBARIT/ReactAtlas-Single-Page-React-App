import styles from "./Map.module.css";
import {useSearchParams} from "react-router-dom";
function Map(){
   const [searchParams, setSearchParams] = useSearchParams();
   const lat=searchParams.get("lat");
    const lng=searchParams.get("lng");

   
   
   return (<div  className={styles.mapContainer}>
       <h1>Map</h1>
       <h1>{lat}, {lng}</h1>
       <button onClick={()=>setSearchParams({lat:30,lng:40})} >
Change pos
       </button>
    </div>)
}
export default Map;