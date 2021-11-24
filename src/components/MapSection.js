import { useState, useEffect } from "react";
import Map from "../components/GoogleMap";
import ListRestaurants from "../components/ListRestaurants";
import style from "../assets/styles/map_section.module.css";
import { ErrorBoundary } from "react-error-boundary";
import Filter from "../components/Filter";
import OfflineButton from "./OfflineModeBtn"
import AddRestaurant from "./AddRestaurant";

function ErrorFallback({ error }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

const MapSection = () => {
  const [generalMapData, setGeneralMapData] = useState([]);
  const [restaurantsList, setRestaurantsList] = useState([]);
  const [filteredRestorantsMap, setFilteredRestorantsMap] = useState([]);
  const [service, setService] = useState();
  const [minFilterStar, setMinFilterStar] = useState();
  const [maxFilterStar, setMaxFilterStar] = useState();
  const [offlineData, setOfflineData ] = useState()

  const mapCallbackApiData = (restaurantApiData) => {
    let sortedRestaurantsData = [];
    if(offlineData) {
      setGeneralMapData(restaurantApiData);
      setRestaurantsList(restaurantApiData);
      setFilteredRestorantsMap(restaurantApiData);
    } else {
      for (let i = 0; i < restaurantApiData.length; i++) {
        sortedRestaurantsData.push({
          place_id: restaurantApiData[i].place_id,
          restaurantName: restaurantApiData[i].name,
          address: restaurantApiData[i].vicinity,
          geometry:  restaurantApiData[i].geometry,
          rating: restaurantApiData[i].rating,
          user_ratings_total: restaurantApiData[i].user_ratings_total,
          reviews: restaurantApiData[i].reviews
        });
      }
      setRestaurantsList(sortedRestaurantsData);
      setFilteredRestorantsMap(sortedRestaurantsData);
    }
  };

  const callbackMaxFilter = (min, max) => {
    setMinFilterStar(min);
    setMaxFilterStar(max);
  };
 
  const callbackGetService = (service) => {
    setService(service);
  };

  const callbackAddRestaurant = (newRestaurant) => {
    setRestaurantsList((restaurantsList) => [
      ...restaurantsList,
      newRestaurant,
    ]);
    setFilteredRestorantsMap((filteredRestorantsMap) => [
      ...filteredRestorantsMap,
      newRestaurant,
    ]);
  };

  // TODO : Décommenter pour JSON vérsion

  // const getAverageRatingRestaurants = (listOfRestaurants, min, max) => {
  //   const average = (array) => array.reduce((a, b) => a + b) / array.length;
  //   const restaurantListStars = [];

  //   let listRestorants = [];
  //   listOfRestaurants.map((restaurant) => {

  //     for (let i = 0; i < restaurant.ratings.length; i++) {
  //       restaurantListStars.push(restaurant.ratings[i].stars);
  //     }
  //     restaurantListStars.push(restaurant.rating)

  //     if (
  //       average(restaurantListStars) >= min &&
  //       average(restaurantListStars) <= max
  //     ) {
  //       listRestorants.push(restaurant);
  //     }
  //   });
  //   setFilteredRestorantsMap(listRestorants);
  //   setRestaurantsList(listRestorants);
  // };

  const callbackOffline = (offlineData) => {
    setOfflineData(offlineData);
  }

  const getCallbackRestaurantWithReview = (newRestaurantWithReview) => {
    for(let i=0; i<restaurantsList.length; i++) {
      if(newRestaurantWithReview.place_id === restaurantsList[i].place_id) {
        restaurantsList[i].reviews = newRestaurantWithReview.reviews;
      }
    }
  }
  return (
    <div>
      <div className={style.map_section}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Map
            newListRestaurants={restaurantsList}
            mapApiCallback={mapCallbackApiData}
            callbackGetServiceMap={callbackGetService}
            minFilterStar={minFilterStar}
            maxFilterStar={maxFilterStar}
            offlineData={offlineData}
          />
          <div className={style.list_restaurants}>
            <div className={style.container_options}>
              <Filter callbackFilter={callbackMaxFilter} />
              <AddRestaurant callbackAddRestaurant={callbackAddRestaurant} />
              <OfflineButton callbackOffline={callbackOffline}></OfflineButton>
            </div>
            <ListRestaurants
              listRestaurants={restaurantsList}
              service={service}
              offlineData={offlineData}
              callbackRestaurantWithReview={getCallbackRestaurantWithReview}
            />
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default MapSection;
