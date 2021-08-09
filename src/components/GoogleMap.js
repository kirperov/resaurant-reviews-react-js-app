import React from 'react'
import { useRef, useEffect, useState} from "react";
// import autoGeolocation from "../assets/js/autoGeolocation";
import style from '../assets/styles/map.module.css';
import { restaurants } from '../assets/restaurants';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { InfoBox } from '@react-google-maps/api';
import { MarkerClusterer, Marker  } from '@react-google-maps/api';
import { Autocomplete } from '@react-google-maps/api';

const containerStyle = {
  height: '100%'
};

let autocomplete = null;

const Map = ({parentCallback}) => {
    const [center, setCenter] = useState({
    lat: 43.306112999999996,
    lng: 5.3987991
  });

  const refMap = useRef(null);
  window.onload = (event) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        }
      );
    } else {
      setCenter({ lat: center.lat, lng: center.lng});
    }
  };

const onLoad = (autocompleted) => {
  autocomplete = autocompleted;
}

const onPlaceChanged = () => {
  try {
    setCenter({ lat: autocomplete.getPlace().geometry.location.lat(), lng: autocomplete.getPlace().geometry.location.lng()});
    hideMsgAddressError();
  } catch (error) {
    showMsgAddressError();
  }
}

const checkBounds = () => {
  let sortedListRestaurants = [];
  var bounds = refMap.current.state.map.getBounds();
  restaurants.filter((restaurant) => {
    bounds.contains({ lat: restaurant.lat, lng: restaurant.long})
})

  for(let i=0; i< restaurants.length; i++) {
    if(bounds.contains({ lat: restaurants[i].lat, lng:restaurants[i].long }) === true ) {
      sortedListRestaurants.push(restaurants[i])
    }
    parentCallback(sortedListRestaurants);
  }
}

const test = () =>  {
  parentCallback(restaurants);
}

const showMsgAddressError = () => {
  document.getElementById('search-msg-error').style.display = "block";
}

const hideMsgAddressError = () => {
    document.getElementById('search-msg-error').style.display = "none";
}

const restaurantsData = restaurants.map(restaurant => {
  return { lat: restaurant.lat, lng: restaurant.long };
})

const options = {
  imagePath:
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
}

function createKey(location) {
  return location.lat + location.lng;
}

  return (
    <LoadScript 
      id="script-loader"
      googleMapsApiKey={process.env.REACT_APP_API_KEY}
      libraries={["places"]}
    >
      <div className={style.map} >
        <div id="search-msg-error" className={ style.searchMsgError }> Veillez choisir l'adresse dans la liste </div>
        <GoogleMap
          ref={refMap}
          onDrag={ checkBounds }
          options={options}
          onLoad={test}
          id="InfoBox-example" 
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          <InfoBox
            options={options}
            position={center}
          >
            <div className={style.infoBox}>
              <div style={{ fontSize: 16, fontColor: `#08233B` }}>
                You are here.
              </div>
            </div>
          </InfoBox>
          <MarkerClusterer options={options}>
            {(clusterer) =>
              restaurantsData.map((restaurantLocation) => (
                <Marker key={createKey(restaurantLocation)} position={restaurantLocation} clusterer={clusterer} />
              ))
            }
          </MarkerClusterer>
          <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
            >
            <input
              onClick={hideMsgAddressError}
              onChange={hideMsgAddressError}
              id="inputSearch"
              type="text"
              placeholder={`Search address`}
              className={style.inputSearch}
            />
          </Autocomplete>
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
      </div>
    </LoadScript>
  )
}

export default React.memo(Map)