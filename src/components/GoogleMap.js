import React from 'react'
import { useRef, useState} from "react";
import style from '../assets/styles/map.module.css';
import { restaurants } from '../assets/restaurants';
import { GoogleMap, LoadScript, MarkerClusterer, Marker,Autocomplete, InfoBox } from '@react-google-maps/api';

const containerStyle = {
  height: '100%'
};

let autocomplete = null;

const Map = (props) => {

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
  let bounds = refMap.current.state.map.getBounds();
  let sortedListRestaurants;
  
    sortedListRestaurants = props.newListRestaurants;
  

    sortedListRestaurants.filter(restaurant => 
    bounds.contains({ lat: restaurant.lat, lng: restaurant.long})
)
  props.parentCallback(sortedListRestaurants);
}

const showMsgAddressError = () => {
  document.getElementById('search-msg-error').style.display = "block";
}

const hideMsgAddressError = () => {
    document.getElementById('search-msg-error').style.display = "none";
}

const restaurantsData = props.newListRestaurants.map(restaurant => {
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
      
          onBoundsChanged={checkBounds}
          options={options}
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