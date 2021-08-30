import { useState } from "react";
import Map from '../components/GoogleMap';
import ListRestaurants from '../components/ListRestaurants';
import style from '../assets/styles/map_section.module.css';
import {ErrorBoundary} from 'react-error-boundary'
import Filter from '../components/Filter';

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
  const callback = (restaurantData) => {
    setRestaurants(restaurantData)
  }

  const callbackForFilter = (min, max) => {
    setMinMax([min, max])
  }
 
  sortedRestaurants.map((restaurant, index) =>
    console.log(restaurant.ratings)
  );

 sortedRestaurants.map(obj => {
  const arr = []
  const average = (array) => array.reduce((a, b) => a + b) / array.length;
     for(let i = 0; i < obj.ratings.length; i++) {
      arr.push(obj.ratings[i].stars)
     }
     console.log(average(arr))
 })


  return (
    <div>
        <div className={style.map_section}>
          <Map parentCallback={callback}></Map>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <div className={style.list_restaurants}>
              <Filter callbackFilter={callbackForFilter} />
              <ListRestaurants listRestaurants={sortedRestaurants} filterSelected={minMax}/> 
            </div>
          </ErrorBoundary>
        </div>
    </div>
  )
}

export default MapSection