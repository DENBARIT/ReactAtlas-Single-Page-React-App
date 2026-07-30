import styles from './CountryList.module.css'
import Spinner from "./Spinner"
import CountryItem from "./CountryItem"
import Message from "./Message"
function CountryList({cities,isLoading}) {
    // const countries = cities.map(city => city.country);
    if(isLoading) return <Spinner/>
    if(cities.length === 0) return <Message message="No cities to display."/>
    const countries = cities.reduce((arr, city) => {
                if(!arr.map(c => c.country).includes(city.country)) 
                    return [...arr, {country: city.country, emoji: city.emoji}];
                return arr;
            }, []);
    return (
    //     <ul className={styles.countryList}>
    // {countries.map(country => <CountryItem country={country} key={country} />)}
        <ul className={styles.countryList}>
            
            {countries.map(country => <CountryItem country={country} key={country.country} />)}
        
    
    
        </ul>
     
    )
}

export default CountryList