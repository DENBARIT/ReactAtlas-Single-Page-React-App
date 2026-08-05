import { BrowserRouter, Routes, Route } from "react-router-dom";
// import {useState,useEffect} from "react";
import Product from "./pages/Product";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";  
import CityList from "./components/CityList";
import City from "./components/City";
import CountryList from "./components/CountryList";
import { Navigate } from "react-router-dom";
import Form from "./components/Form";
import { CitiesProvider } from "./CitiesContext/CitiesContext";
import { AuthProvider } from "./CitiesContext/FakeAuthContect";
// const BASE_URL="http://localhost:8000";
export default function App() {
 
//  const [cities,setCities]=useState([])
//  const [isLoading,setIsLoading]=useState(false)
//  useEffect(function(){
// async function fetchCities(){
//   try {
//     setIsLoading(true)
//     const res=await fetch(`${BASE_URL}/cities`);
//   const data=await res.json();
//   setCities(data);}catch{
//     alert("There was an error loading data...")
//   }finally{
//     setIsLoading(false)
//   }
// }fetchCities();
//  },[]);

  return (
    <AuthProvider>
   <CitiesProvider>  
   
    <BrowserRouter>
   
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
       
        <Route path="/app" element={<AppLayout />} >
        {/* <Route index element={<CityList  cities={cities} isLoading={isLoading}/>} /> */}
        <Route index element={<Navigate to="cities" replace />} />
        <Route path="cities" element={<CityList />} />
        <Route path="cities/:id" element={<City/>}/>
        <Route path="countries" element={<CountryList  />} />
        <Route path="form" element={<Form/>} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    
    </BrowserRouter></CitiesProvider></AuthProvider>
  );
}
