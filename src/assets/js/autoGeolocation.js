const autoGeolocation = (infoWindow, googleMap) => {
    //Error
    const handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
        infoWindow.setPosition(pos);
        infoWindow.setContent(
            browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
        );
        infoWindow.open(googleMap);
    }

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent("You are here.");
          infoWindow.open(googleMap);
          googleMap.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, googleMap.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, googleMap.getCenter());
    }
}

export default autoGeolocation;