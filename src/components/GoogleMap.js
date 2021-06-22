
import React from 'react'
import { useRef, useEffect } from "react";
import autoGeolocation from "../assets/js/autoGeolocation";
import style from '../assets/styles/map.module.css';
import { restaurants } from '../assets/restaurants';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { InfoBox } from '@react-google-maps/api';
import { MarkerClusterer, Marker  } from '@react-google-maps/api';
import { Autocomplete } from '@react-google-maps/api';

const containerStyle = {
  height: '100%'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const options = { closeBoxURL: '', enableEventPropagation: true };
  let autocomplete = null;

function Map() {

  
  const onLoad = (autocompleted) => {
    console.log('autocomplete: ', autocomplete)
    autocomplete = autocompleted
  }

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      console.log(autocomplete.getPlace())
    } else {
      console.log(autocomplete)
      console.log('Autocomplete is not loaded yet!')
    }
  }

 

const center = { lat: -28.024, lng: 140.887 }

const restaurantsData = restaurants.map(restaurant => {
  return { lat: restaurant.lat, lng: restaurant.long };
})

const options = {
  imagePath:
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
}

function createKey(location) {
  return location.lat + location.lng
}

  return (
    <LoadScript 
      id="script-loader"
      googleMapsApiKey={process.env.REACT_APP_API_KEY}
      libraries={["places"]}
    >
      <div className={style.map} >
        <GoogleMap
          id="InfoBox-example" 
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
        <InfoBox
          // onLoad={onLoad}
          options={options}
          position={center}
        >
          <div style={{ backgroundColor: 'yellow', opacity: 0.75, padding: 12 }}>
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
              type="text"
              placeholder="Customized your placeholder"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-120px"
              }}
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