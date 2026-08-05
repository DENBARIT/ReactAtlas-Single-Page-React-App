
import {createContext} from "react";
import {useEffect,useContext,useReducer} from "react";
const CitiesContext=createContext();
const BASE_URL="http://localhost:8000";

const initialState={
  cities:[],
  isLoading:false,
  currentCity:{},
  error:""
}
function reducer(state,action){
switch(action.type){
  case "cities/loaded":
  return {...state,cities:action.payload,isLoading:false}
  case "loading":
  return {...state,isLoading:true}
  case "city/loaded":
    return {
      ...state,
      isLoading:false,
      currentCity:action.payload
    }
    case "city/created":
      return{
        ...state,
        isLoading:false,
        cities:[...state.cities,action.payload],
        currentCity:action.payload
      }
      case "city/deleted":
        return {
          ...state,
          isLoading:false,
          cities:state.cities.filter(city=>city.id!==action.payload),
          currentCity:state.currentCity.id===action.payload?null:state.currentCity
        }
  case "rejected":
  return {...state,error:action.payload,isLoading:false}
  
default:throw new Error(`Unknown action type: ${action.type}`)
}}
function CitiesProvider({children}){

const [{cities,isLoading,currentCity,error},dispatch]=useReducer(reducer,initialState)
// const [cities,setCities]=useState([])
//  const [isLoading,setIsLoading]=useState(false)
//  const [currentCity,setCurrentCity]=useState()
 useEffect(function(){
async function fetchCities(){
  dispatch({type:"loading"})
   try {
    // setIsLoading(true)
   
    const res=await fetch(`${BASE_URL}/cities`);
  const data=await res.json();
  dispatch({type:"cities/loaded",payload:data})}
  catch{
    dispatch({
      type:"rejected",
      payload:"There was an error loading cities..."
    })
  }
    
  }
fetchCities()
 },[]);

 async function getCity(id){
  //we have to change the id to number since the id from the url is a string and the id from the state is a number
  if(currentCity?.id===Number(id)) return;
    dispatch({type:"loading"})
  
  try {
  const res=await fetch(`${BASE_URL}/cities/${id}`);
  const data=await res.json();
  console.log(data)
  // setCurrentCity(data);
dispatch({type:"city/loaded",payload:data})

}catch{
    dispatch({
      type:"rejected",
      payload:"There was an error loading city..."
    })
  }
}
async function createCity(newCity){
  dispatch({type:"loading"})
  try {
  const res=await fetch(`${BASE_URL}/cities`,{
    method:"POST",
    body:JSON.stringify(newCity),
    headers:{
      "Content-Type":"application/json"
    }
  });
  if(!res.ok) throw new Error("Error creating city")
  const data=await res.json();
  // setCities((cities)=>[...cities,data])
  dispatch({type:"city/created",payload:data})
}catch{
  dispatch({
    type:"rejected",
    payload:"There was an error creating city..."
  })
}
}

 async function deleteCity(id){
    dispatch({type:"loading"})
  
  try {
  const res=await fetch(`${BASE_URL}/cities/${id}`,{
    method:"DELETE"
  });
  const data=await res.json();
  dispatch({type:"city/deleted",payload:id})
}catch{
  dispatch({
    type:"rejected",
    payload:"There was an error deleting the city..."
  })
}
    
}
return <CitiesContext.Provider value={{cities, isLoading, currentCity, getCity, createCity,deleteCity}}>
        {children}
    </CitiesContext.Provider>
}
function useCities(){
  const context=useContext(CitiesContext);
  if(context===undefined){
    throw new Error("useCities must be used within a CitiesProvider")
  }
return context;
}
export {useCities,CitiesProvider}