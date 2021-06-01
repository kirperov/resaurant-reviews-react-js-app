import GoogleMap from '../components/GoogleMap';
import ListRestaurants from '../components/ListRestaurants';
import style from '../assets/styles/map_section.module.css';
const MapSection = () => {
    return (
        <div className={style.map_section}>
            <GoogleMap></GoogleMap>
            <ListRestaurants></ListRestaurants>
        </div>
    )
}

export default MapSection