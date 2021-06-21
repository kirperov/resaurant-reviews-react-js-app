import { useState } from "react";
import GoogleMap from '../components/GoogleMap';
import ListRestaurants from '../components/ListRestaurants';
import style from '../assets/styles/map_section.module.css';
import Geolocation from '../components/Geolocation';

const MapSection = () => {
    const [location, setLocation] = useState("Marseille");
    return (
        <div>
            <Geolocation position={location => setLocation(location)}></Geolocation>
            <div className={style.map_section}>
                <GoogleMap placeName={location}></GoogleMap>
                <ListRestaurants></ListRestaurants>
            </div>
        </div>
    )
}

export default MapSection