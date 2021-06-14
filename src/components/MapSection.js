import GoogleMap from '../components/GoogleMap';
import ListRestaurants from '../components/ListRestaurants';
import style from '../assets/styles/map_section.module.css';
import Geolocation from '../components/Geolocation';

const MapSection = () => {
    return (
        <div>
            <Geolocation></Geolocation>
            <div className={style.map_section}>
                <GoogleMap placeName="Marseille"></GoogleMap>
                <ListRestaurants></ListRestaurants>
            </div>
        </div>
    )
}

export default MapSection