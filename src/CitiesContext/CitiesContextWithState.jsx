
import {createContext} from "react";
import {useState,useEffect,useContext} from "react";
const CitiesContext=createContext();
const BASE_URL="http://localhost:8000";


function CitiesProvider({children}){

const [cities,setCities]=useState([])
 const [isLoading,setIsLoading]=useState(false)
 const [currentCity,setCurrentCity]=useState()
 useEffect(function(){
async function fetchCities(){
  try {
    setIsLoading(true)
    const res=await fetch(`${BASE_URL}/cities`);
  const data=await res.json();
  setCities(data);}catch{
    alert("There was an error loading data...")
  }finally{
    setIsLoading(false)
  }
}fetchCities();
 },[]);
 async function getCity(id){
  try {
    setIsLoading(true)
  const res=await fetch(`${BASE_URL}/cities/${id}`);
  const data=await res.json();
  console.log(data)
  setCurrentCity(data);
}catch{
    alert("There was an error loading data...")
  }finally{
    setIsLoading(false)
  }
}
async function createCity(newCity){
  try {
    setIsLoading(true)
  const res=await fetch(`${BASE_URL}/cities`,{
    method:"POST",
    body:JSON.stringify(newCity),
    headers:{
      "Content-Type":"application/json"
    }
  });
  if(!res.ok) throw new Error("Error creating city")
  const data=await res.json();
  setCities((cities)=>[...cities,data])
}catch(err){
  alert(err.message)
}finally{
    setIsLoading(false)
  }
}

 async function deleteCity(id){
  try {
    setIsLoading(true)
  const res=await fetch(`${BASE_URL}/cities/${id}`,{
    method:"DELETE"
  });
  const data=await res.json();
  setCities(cities=>cities.filter(city=>city.id!==id ))
}catch{
  alert("There was an error deleting the city")
}finally{
    setIsLoading(false)
  }
}
    return (<CitiesContext.Provider value={{cities, isLoading, currentCity, getCity, createCity,deleteCity}}>
        {children}
    </CitiesContext.Provider>
)}
function useCities(){
  const context=useContext(CitiesContext);
  if(context===undefined){
    throw new Error("useCities must be used within a CitiesProvider")
  }
return context;}
export {useCities,CitiesProvider}