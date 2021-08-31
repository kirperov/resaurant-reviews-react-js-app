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
  const [sortedRestaurants, setRestaurants] = useState([]);
  const [minMax, setMinMax] = useState([1,1]);
  const [filteredData, setFilteredData] = useState([]);
  const callback = (restaurantData) => {
    // newList.push(restaurantData)
    console.log(restaurantData)
  }

  const callbackForFilter = (min, max) => {
    setMinMax([min, max])
  }
 
  restaurants.map((restaurant, index) =>
    console.log(restaurant.ratings)
  );

  const newList = [];
  restaurants.map(obj => {
  const arr = []
  const average = (array) => array.reduce((a, b) => a + b) / array.length;
    for(let i = 0; i < obj.ratings.length; i++) {
      arr.push(obj.ratings[i].stars)
    }
    
    if(average(arr) >= minMax[0] && average(arr) <= minMax[1]) {
      newList.push(obj)
    }
 })

  return (
    <div>
        <div className={style.map_section}>
          <Map newListRestaurants={newList} parentCallback={callback}></Map>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <div className={style.list_restaurants}>
              <Filter callbackFilter={callbackForFilter} />
              <ListRestaurants listRestaurants={newList} filterSelected={minMax}/> 
            </div>
          </ErrorBoundary>
        </div>
    </div>
  )
}

export default MapSection