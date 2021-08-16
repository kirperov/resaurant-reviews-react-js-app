import { useState } from "react";
import Map from '../components/GoogleMap';
import ListRestaurants from '../components/ListRestaurants';
import style from '../assets/styles/map_section.module.css';
import {ErrorBoundary} from 'react-error-boundary'
import { restaurants } from '../assets/restaurants';


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

  // for(let i = 0; i < sortedRestaurants.length; i++) {
  //   for(let n = 0; n < sortedRestaurants[i].ratings.length; n++ ) {
  //     console.log(sortedRestaurants[i].ratings[n])
  //   }
  // }
    return (
        <div>
             <div className={style.map_section}>
                <Map parentCallback={callback} ></Map>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <ListRestaurants listRestaurants={sortedRestaurants}></ListRestaurants>
                </ErrorBoundary>
            </div>
        </div>
    )
}

export default MapSection