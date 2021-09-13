import { useState } from "react";
import Map from '../components/GoogleMap';
import ListRestaurants from '../components/ListRestaurants';
import style from '../assets/styles/map_section.module.css';
import {ErrorBoundary} from 'react-error-boundary'
import Filter from '../components/Filter';
import { restaurants } from "../assets/restaurants";

function ErrorFallback({error}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{color: 'red'}}>{error.message}</pre>
    </div>
  )
}

const MapSection = () => {
  const [restaurantsList, setRestaurantsList] = useState(restaurants);
  const [filteredRestorantsMap, setFilteredRestorantsMap] = useState([]);

  const mapCallbackData = (restaurantData) => {
    setFilteredRestorantsMap(restaurantData);
  }

  const callbackMaxFilter = (min, max) => {

    // setFilterMax(max);
    getAverageRatingRestaurants(restaurants,min, max);

  }

  const getAverageRatingRestaurants = (listOfRestaurants,min, max) => {
  const average = (array) => array.reduce((a, b) => a + b) / array.length;
  
    let listRestorants = [];
    listOfRestaurants.map(restaurant => {
      const restaurantListStars = [];
 
      for(let i = 0; i < restaurant.ratings.length; i++) {
        restaurantListStars.push(restaurant.ratings[i].stars);
      }

      if(average(restaurantListStars) >= min && average(restaurantListStars) <= max) {
        listRestorants.push(restaurant);
      }
    })
    setFilteredRestorantsMap(listRestorants);
    setRestaurantsList(listRestorants);
  }


  return (
    <div>
        <div className={style.map_section}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Map newListRestaurants={restaurantsList} mapCallback={mapCallbackData} />
            <div className={style.list_restaurants}>
              <Filter callbackFilter={callbackMaxFilter}/>
              <ListRestaurants listRestaurants={filteredRestorantsMap} />
            </div>
          </ErrorBoundary>
        </div>
    </div>
  )
}

export default MapSection