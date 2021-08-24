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
  const callback = (restaurantData) => {
    setRestaurants(restaurantData)
  }

  const callbackForFilter = (min, max) => {
    // console.log(filteredRestaurantList(sortedRestaurants, min, max))

  }

  return (
    <div>
        <div className={style.map_section}>
          <Map parentCallback={callback}></Map>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <div className={style.list_restaurants}>
              <Filter callbackFilter={callbackForFilter}></Filter>
              <ListRestaurants listRestaurants={sortedRestaurants}></ListRestaurants>
            </div>
          </ErrorBoundary>
        </div>
    </div>
  )
}

export default MapSection