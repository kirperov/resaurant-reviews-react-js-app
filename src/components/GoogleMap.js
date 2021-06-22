
import { useRef, useEffect } from "react";
import autoGeolocation from "../assets/js/autoGeolocation";
import style from '../assets/styles/map.module.css';
import { restaurants } from '../assets/restaurants';

const GoogleMap = ({ placeName}) => {
    const googleMapRef = useRef();
    let googleMap, infoWindow;
    useEffect(() => {
      const googleMapScript = document.createElement("script");
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&libraries=places`;
      googleMapScript.async = true;
      window.document.body.appendChild(googleMapScript);
      googleMapScript.addEventListener("load", () => {
        getLatLng();
      });
    });

  const createGoogleMap = (coordinates) => {
    googleMap = new window.google.maps.Map(googleMapRef.current, {
      zoom: 15,
      center: {
        lat: coordinates.lat(),
        lng: coordinates.lng(),
      },
      disableDefaultUI: false,
    });
    // autoGeolocation(new window.google.maps.InfoWindow(), googleMap) 
  };

  const getLatLng = () => {
    let lat, lng, placeId;
    new window.google.maps.Geocoder().geocode(
      { address: `${placeName}` },
       (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
        
          placeId = results[0].place_id;
          createGoogleMap(results[0].geometry.location);
          for(var i = 0; i < restaurants.length; i++) {
          lat = restaurants[i].lat;
          lng = restaurants[i].long;
          new window.google.maps.Marker({
            position: { lat, lng },
            map: googleMap,
            animation: window.google.maps.Animation.DROP,
            title: `${placeName}`,
          });
        }
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
      }
    );
  };

  return (
    <div
      id="google-map"
      ref={googleMapRef}
      className={style.map}
    />
  );
};

export default GoogleMap;