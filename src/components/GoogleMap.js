import React from "react";
import { useRef, useState, useEffect } from "react";
import style from "../assets/styles/map.module.css";
import { restaurants } from '../assets/restaurants';
import marker from "../assets/images/cutlery.png";
import myPosition from "../assets/images/location.png";
import logo from "../assets/images/logo.png";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowRight} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  GoogleMap,
  LoadScript,
  MarkerClusterer,
  Marker,
  Autocomplete
} from "@react-google-maps/api";
 
library.add(faArrowRight);
const containerStyle = {
  height: "100%",
};
const libraries = ["places"];
let getNextPage;
const Map = (props) => {
  let filteredData=[];
  const [autocomplete, setAutocomplete] = useState(null);
  const [countNextLimit, setCountNextLimit] = useState({count: 0});
  // Default geolocation Marseille, France
  const [geolocation, setGeolocation] = useState({ lat: 43.2965, lng: 5.3698 });
  // const [currentCenter, setcurrentCenter] = useState({ lat: 0, lng: 0 });
  const [service, setService] = useState();
  const [restaurantsDataApiResults, setRestaurantsDataApiResults] = useState({
    data: [],
  });
  const refMap = useRef(null);
 
  window.onload = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setGeolocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
    apiResultService();
  };

  const onLoad = (autocompleted) => {
    setAutocomplete(autocompleted);
  };

  const onPlaceChanged = () => {
    try {
      setGeolocation({
        lat: autocomplete.getPlace().geometry.location.lat(),
        lng: autocomplete.getPlace().geometry.location.lng(),
      });
      hideMsgAddressError();
    } catch (error) {
      showMsgAddressError();
    }
  };

  useEffect(() => {
    apiResultService();
  }, [geolocation]);

  useEffect(() => {
    props.mapApiCallback(restaurantsDataApiResults.data);
  }, [restaurantsDataApiResults]);

  const checkBounds = () => {
    let bounds = refMap.current.state.map.getBounds();
    if (bounds) {
      let sortedListRestaurants = restaurantsDataApiResults.data.filter(
        (restaurant) =>
          bounds.contains({
            lat: restaurant.geometry.location.lat(),
            lng: restaurant.geometry.location.lng(),
          })
      );
      props.mapApiCallback(sortedListRestaurants)
    }
  };

  const showMsgAddressError = () => {
    document.getElementById("search-msg-error").style.display = "block";
  };

  const hideMsgAddressError = () => {
    document.getElementById("search-msg-error").style.display = "none";
  };

  const options = {
    zoomControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m", // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
  };


  const getRestaurantsApi = () => {
    if(service) {
      new Promise((resolve, reject) => {
        service.nearbySearch(
          {
            location: geolocation,
            radius: 1500,
            type: "restaurant",
          },
          (results, status, pagination) => {
            if (status !== "OK" || !results) {
              return;
            }
            setRestaurantsDataApiResults({ data: results });
            
            if (pagination && pagination.hasNextPage) {
              // Note: nextPage will call the same handler function as the initial call
              getNextPage = () => {
                setCountNextLimit({count: countNextLimit.count ++})
                pagination.nextPage();
              };
            }
          }
        );
      });
    }
  };

  const initService = () => {
    setService(
      new window.google.maps.places.PlacesService(refMap.current.state.map)
    );
  };

  const apiResultService = () => {
    getRestaurantsApi();
    props.callbackGetServiceMap(service);
  };

  return (
    <LoadScript
      id="script-loader"
      googleMapsApiKey={process.env.REACT_APP_API_KEY}
      libraries={libraries}
    >
      <div className={style.map}>
        <div className={style.nextRestaurantsContainer}>
          <div className={style.logo}>
            <img src={logo} alt="good food" />
          </div>
          <div className={style.nextBntContainer}>
            {(countNextLimit.count < 2) ? restaurantsDataApiResults.data.length > 0 ? <button onClick={getNextPage} className={style.nextRestaurantsBtn}> Show more restaurants <FontAwesomeIcon icon="arrow-right"/> </button> : "" :"No more restaurants"}

          </div>
        </div>
        <div id="search-msg-error" className={style.searchMsgError}>
          Veillez choisir l'adresse dans la liste
        </div>
        <GoogleMap
          ref={refMap}
          onBoundsChanged={checkBounds}
          options={options}
          id="google-map"
          mapContainerStyle={containerStyle}
          center={geolocation}
          zoom={15}
          onLoad={initService}
        >
          <Marker icon={myPosition} position={geolocation} />
          <MarkerClusterer
            minimumClusterSize={20}
            zoomOnClick={false}
            options={options}
          >
            {(clusterer) =>
              restaurantsDataApiResults.data.map((restaurantLocation) => (
                <Marker
                  icon={marker}
                  key={restaurantLocation.place_id}
                  position={restaurantLocation.geometry.location}
                  clusterer={clusterer}
                />
              ))
            }
          </MarkerClusterer>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <input
              onClick={hideMsgAddressError}
              onChange={hideMsgAddressError}
              id="inputSearch"
              type="text"
              placeholder={`Search address`}
              className={style.inputSearch}
            />
          </Autocomplete>
          <></>
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default React.memo(Map);
