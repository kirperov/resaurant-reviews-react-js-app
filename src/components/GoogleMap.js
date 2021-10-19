import React from 'react'
import { useRef, useState, useEffect} from "react";
import style from '../assets/styles/map.module.css';
// import { restaurants } from '../assets/restaurants';
import marker from '../assets/images/cutlery.png';
import myPosition from '../assets/images/location.png';
import { GoogleMap, LoadScript, MarkerClusterer, Marker, Autocomplete} from '@react-google-maps/api';

const containerStyle = {
  height: '100%'
};

const libraries = ['places'];
let getNextPage;
const Map = (props) => {
  const [autocomplete, setAutocomplete] = useState(null);
  const [geolocation, setGeolocation] = useState({});
  const [service, setService] = useState();
  const [currentCener, setCurrentCener] = useState({ lat:0, lng:0});
  const [restaurantsDataApiResults, setRestaurantsDataApiResults] = useState({data: []});
  const refMap = useRef(null);
  
  window.onload = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeolocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        }
      );
    } else {
      // setGeolocation({ lat: geolocation.lat, lng: geolocation.lng});
      // setCurrentCener({ lat: geolocation.lat, lng: geolocation.lng});
    }
  };

const onLoad = (autocompleted) => {
  setAutocomplete(autocompleted)
}

const onPlaceChanged = () => {
  try {
    setGeolocation({ lat: autocomplete.getPlace().geometry.location.lat(), lng: autocomplete.getPlace().geometry.location.lng()});
    hideMsgAddressError();
  } catch (error) {
    showMsgAddressError();
  }
}

// useEffect(() => {
//   console.log(restaurantsDataApiResults)
//   props.mapApiCallback(restaurantsDataApiResults)
// },[restaurantsDataApiResults]);

const checkBounds = () => {
  let bounds = refMap.current.state.map.getBounds();
   let lat = 0;
   let lon = 0;
  if(refMap.current.state.map.getCenter() !== undefined) {
     lat = refMap.current.state.map.getCenter().lat();
     lon = refMap.current.state.map.getCenter().lng();
  }
  setCurrentCener({ lat: lat, lng: lon});
  if(bounds) {
    let sortedListRestaurants = restaurantsDataApiResults.data.filter(restaurant => 
      bounds.contains({ lat: restaurant.geometry.location.lat(), lng: restaurant.geometry.location.lng()})
    )

    // setRestaurantsDataApiResults({data: sortedListRestaurants})
    props.mapApiCallback(sortedListRestaurants)
  }
}

const showMsgAddressError = () => {
  document.getElementById('search-msg-error').style.display = "block";
}

const hideMsgAddressError = () => {
    document.getElementById('search-msg-error').style.display = "none";
}

const options = {
  imagePath:
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
}

const getRestaurantsApi = (service) => {
  new Promise((resolve, reject) => {
    service.nearbySearch(
      {
        location: currentCener,
        radius: 5000,
        type: "restaurant"
      },
      (results, status, pagination) => {
        if(status !== "OK" || !results) {
          return;
        }
        setRestaurantsDataApiResults({data: results});
        if (pagination && pagination.hasNextPage) {
          // Note: nextPage will call the same handler function as the initial call
          getNextPage = () => {
            pagination.nextPage();
          }
        };
      }
    );
  });
}

const initService = () => {
  setService(new window.google.maps.places.PlacesService(refMap.current.state.map))
}

const onMapLoad = () => {
  getRestaurantsApi(service);
  props.callbackGetServiceMap(service)
}

  return (
    <LoadScript
      id="script-loader"
      googleMapsApiKey={process.env.REACT_APP_API_KEY}
      libraries={libraries}
     >
      <div className={style.map} >
        <div id="search-msg-error" className={ style.searchMsgError }> Veillez choisir l'adresse dans la liste </div>
        <GoogleMap
          ref={refMap}
          onBoundsChanged={checkBounds}
          options={options}
          id="InfoBox-example" 
          mapContainerStyle={containerStyle}
          center={geolocation}
          zoom={10}
          onLoad={initService}
          onCenterChanged={onMapLoad}
         >
          <Marker icon={myPosition} position={geolocation} />
          <MarkerClusterer minimumClusterSize={20} zoomOnClick={false} options={options}>
            {(clusterer) =>
              restaurantsDataApiResults.data.map((restaurantLocation) => (
                <Marker icon={marker} key={restaurantLocation.place_id} position={restaurantLocation.geometry.location} clusterer={clusterer} />
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
        <button onClick={getNextPage}> next </button>
      </div>
    </LoadScript>
  )
}

export default React.memo(Map)