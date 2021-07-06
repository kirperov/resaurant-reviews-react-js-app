import { useState } from "react";
import Map from '../components/GoogleMap';
import ListRestaurants from '../components/ListRestaurants';
import style from '../assets/styles/map_section.module.css';

const MapSection = () => {
    return (
        <div>
            
             <div className={style.map_section}>
                <Map></Map>
                <ListRestaurants></ListRestaurants>
            </div>
        </div>
    )
}

export default MapSection