import { useState, useEffect } from "react";
import Map from "../components/GoogleMap";
import ListRestaurants from "../components/ListRestaurants";
import style from "../assets/styles/map_section.module.css";
import { ErrorBoundary } from "react-error-boundary";
import Filter from "../components/Filter";
// import { restaurants } from "../assets/restaurants";
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
  const [restaurantsList, setRestaurantsList] = useState([]);
  const [filteredRestorantsMap, setFilteredRestorantsMap] = useState([]);
  const [service, setService] = useState();
  const [minFilterStar, setMinFilterStar] = useState();
  const [maxFilterStar, setMaxFilterStar] = useState();

  const mapCallbackApiData = (restaurantApiData) => {
    let sortedRestaurantsData = [];
    for (let i = 0; i < restaurantApiData.length; i++) {
      sortedRestaurantsData.push({
        place_id: restaurantApiData[i].place_id,
        restaurantName: restaurantApiData[i].name,
        address: restaurantApiData[i].vicinity,
        lat: restaurantApiData[i].geometry.location.lat(),
        long: restaurantApiData[i].geometry.location.lng(),
        rating: restaurantApiData[i].rating,
        user_ratings_total: restaurantApiData[i].user_ratings_total,
      });
    }
    setRestaurantsList(sortedRestaurantsData);
    setFilteredRestorantsMap(sortedRestaurantsData);
  };

  const callbackMaxFilter = (min, max) => {
    setMinFilterStar(min);
    setMaxFilterStar(max);
    let filteredRestaurants = [];
    // if(element.rating >= props.minFilterStar && element.rating <= props.maxFilterStar) { 

    // }
    filteredRestorantsMap.forEach(element => {
  if(element.rating >= min && element.rating <= max) { 
     filteredRestaurants.push(element)
    }
   
    });
    setFilteredRestorantsMap(filteredRestaurants)
    // getAverageRatingRestaurants(restaurantsList, min, max);
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

  const getCallbackReview = (selectedRestaurant) => {
    setFilteredRestorantsMap(selectedRestaurant);
    setRestaurantsList(selectedRestaurant);
  };

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
          />
          <div className={style.list_restaurants}>
            <div className={style.container_options}>
              <Filter callbackFilter={callbackMaxFilter} />
              <AddRestaurant callbackAddRestaurant={callbackAddRestaurant} />
            </div>
            <ListRestaurants
              listRestaurants={filteredRestorantsMap}
              callbackReview={getCallbackReview}
              service={service}
            />
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default MapSection;
