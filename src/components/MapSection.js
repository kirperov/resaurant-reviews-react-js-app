import { useState, useEffect } from "react";
import Map from '../components/GoogleMap';
import ListRestaurants from '../components/ListRestaurants';
import style from '../assets/styles/map_section.module.css';
import {ErrorBoundary} from 'react-error-boundary'
import Filter from '../components/Filter';
// import { restaurants } from "../assets/restaurants";
import AddRestaurant from './AddRestaurant';

function ErrorFallback({error}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{color: 'red'}}>{error.message}</pre>
    </div>
  )
}

const MapSection = () => {
  const [restaurantsList, setRestaurantsList] = useState([]);
  const [filteredRestorantsMap, setFilteredRestorantsMap] = useState([]);
   
  let list = [];
  const mapCallbackData = (restaurantData) => {
    setFilteredRestorantsMap(restaurantData);
  }
  
  const mapCallbackApiData = (restaurantApiData) => {
    list = [];
    for(let i = 0 ; i < restaurantApiData.data.length ; i++) {
      list.push({
        place_id: restaurantApiData.data[i].place_id,
          restaurantName: restaurantApiData.data[i].name,
          address: restaurantApiData.data[i].vicinity,
          lat: restaurantApiData.data[i].geometry.location.lat(),
          long: restaurantApiData.data[i].geometry.location.lng(),
          rating: restaurantApiData.data[i].rating,
          user_ratings_total: restaurantApiData.data[i].user_ratings_total,
          ratings:[
              {
                  stars:0,
                  comment:""
              }
          ]
      });
    }
    setRestaurantsList(list)
  }
  
  const callbackMaxFilter = (min, max) => {
    getAverageRatingRestaurants(restaurantsList,min, max);
  }

  const callbackAddRestaurant = (newRestaurant) => {
    setRestaurantsList(restaurantsList => [...restaurantsList,newRestaurant] );
    setFilteredRestorantsMap(filteredRestorantsMap => [...filteredRestorantsMap,newRestaurant] );
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

  const getCallbackReview = (selectedRestaurant) => {
    setFilteredRestorantsMap(selectedRestaurant);
    setRestaurantsList(selectedRestaurant);
  };

  return (
    <div>
        <div className={style.map_section}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Map newListRestaurants={restaurantsList} mapCallback={mapCallbackData} mapApiCallback={mapCallbackApiData} />
            <div className={style.list_restaurants}>
              <AddRestaurant callbackAddRestaurant={callbackAddRestaurant}/>
              <Filter callbackFilter={callbackMaxFilter}/>
              <ListRestaurants listRestaurants={filteredRestorantsMap} callbackReview={getCallbackReview}/>
            </div>
          </ErrorBoundary>
        </div>
    </div>
  )
}

export default MapSection