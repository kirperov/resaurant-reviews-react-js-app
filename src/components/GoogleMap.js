import React from 'react'
import { useRef, useState} from "react";
import style from '../assets/styles/map.module.css';
import { restaurants } from '../assets/restaurants';
import { GoogleMap, LoadScript, MarkerClusterer, Marker, Autocomplete, InfoBox } from '@react-google-maps/api';

const containerStyle = {
  height: '100%'
};

let autocomplete = null;

const Map = (props) => {
  const [center, setCenter] = useState({
    lat: 48.864716,
    lng: 2.349014
  });

  const [restaurantsDataApi, setRestaurantsDataApi] = useState({data: []});
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
  let sortedListRestaurants = props.newListRestaurants.filter(restaurant => 
    bounds.contains({ lat: restaurant.lat, lng: restaurant.long})
  )
  props.mapCallback(sortedListRestaurants);
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
 
const getNextPage = (pagination) => {
  console.log(pagination)
}

const onMapLoad = map => {
  let service = new window.google.maps.places.PlacesService(map);
  
  new Promise((resolve, reject) => {
    service.nearbySearch(
      {
        location: center,
        radius: 5000,
        type: "restaurant"
      },
      (results, status, pagination) => {
        if (status !== "OK" || !results) return;
        setRestaurantsDataApi({
          data: results.map(restaurant => {
            return { lat: restaurant.geometry.location.lat(), lng: restaurant.geometry.location.lng() };
          })
        });
        if (pagination && pagination.hasNextPage) {
          // Note: nextPage will call the same handler function as the initial call
          console.log(pagination.nextPage())
        };
      }
    );
  });
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
          onLoad={map => onMapLoad(map)}
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
              restaurantsDataApi.data.map((restaurantLocation) => (
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
        <button onClick={getNextPage}>test</button>
      </div>
    </LoadScript>
  )
}

export default React.memo(Map)