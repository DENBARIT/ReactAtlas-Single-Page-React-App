
import { useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import "react-datepicker/dist/react-datepicker.css";

import { useUrlPosition } from "../Hooks/useUrlPosition";
import Spinner from "./Spinner";
// import DatePicker from "./react-datepicker/DatePicker";
import DatePicker from "react-datepicker";
import Message from "./Message";
import { useCities } from "../CitiesContext/CitiesContext";
// here (the special letters used to make flags) start at 127462 (which represents 🇦). Because the uppercase letter "A" has a character code of 65, adding 127397 to 65 perfectly matches 127462 (127397 + 65 = 127462).
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
function Form() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");

  const [country, setCountry] = useState("");
  const [isloadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const {createCity, isLoading} = useCities();
  const [emoji, setEmoji] = useState("");
const [maplat, maplng] = useUrlPosition();
const [geoCodingError, setGeocodingError] = useState("");
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
useEffect(function(){
  if(!maplat || !maplng) return;
async function fetchCityData(){
  try{
    setIsLoadingGeocoding(true);
    setGeocodingError("");
  const res=await fetch(`${BASE_URL}?latitude=${maplat}&longitude=${maplng}`);
  const data=await res.json();
  console.log(data);
  if(!data.countryCode) throw new Error("No country found for this location,please click somewhere else on the map");
  
  setCityName(data.city||data.locality||"");
  setCountry(data.countryName||"");
  setEmoji(convertToEmoji(data.countryCode));

}
catch(err){
  // console.error(err);
  console.log(err);
}
finally{
  setIsLoadingGeocoding(false);


}
}fetchCityData();
return function cleanup(){
  setCityName("");
  setCountry("");
  setEmoji("");
}},[maplat,maplng]);
// this function must be async function since createCity is an action
async function handleSubmit(e){
  e.preventDefault();
  if(!cityName || !date) return;
  const newCity={
cityName,
emoji,
date,
notes,
position:{
  lat:maplat,
  lng:maplng
}
  }

 await createCity(newCity);
 navigate("/app/cities");
}
if(isloadingGeocoding) return <Spinner/>
if(!maplat || !maplng) return <Message message="Start by clicking somewhere on the map"/>
if(geoCodingError) return <Message message={geoCodingError} type="error"/>
  return (
    <form className={`${styles.form} ${isLoading ? "loading" : ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker selected={date} onChange={date=>setDate(date)} dateFormat="MM/dd/yyyy"  />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
       <BackButton/>
      </div>
    </form>
  );
  
}

export default Form;
