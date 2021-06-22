import { useState } from "react";
import Map from '../components/GoogleMap';
import ListRestaurants from '../components/ListRestaurants';
import style from '../assets/styles/map_section.module.css';
import Geolocation from '../components/Geolocation';

const MapSection = () => {
    const [location, setLocation] = useState("Marseille");
    return (
        <div>
            <Geolocation position={location => setLocation(location)}></Geolocation>
            <div className={style.map_section}>
                <Map placeName={location}></Map>
                <ListRestaurants></ListRestaurants>
            </div>
        </div>
    )
}

export default MapSection