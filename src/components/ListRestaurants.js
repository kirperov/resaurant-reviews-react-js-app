import style from '../assets/styles/list_restaurants.module.css';
import DetailRestaurant from '../components/DetailRestaurant';
import ReviewRestaurant from '../components/ReviewRestaurant';
import { useState } from "react";

const ListRestaurants = (props) => {
    const listItems = props.listRestaurants.map((restaurant, index) =>
    <div key={restaurant.restaurantName}>
        <div className={style.list_restaurants_item}>
            <div className={style.restaurant_infos}>
                <span>{restaurant.restaurantName}</span>
                <span>Address: {restaurant.address}</span>
                <ReviewRestaurant restaurantRating={restaurant.ratings}></ReviewRestaurant>
            </div>
            <div className={style.restaurant_rating} >
                <DetailRestaurant selectedRestaurant={restaurant} />
            </div>
        </div>
    </div>
);

    return (
        <div className={style.container_restaurants}>
            <div className={style.list_restaurants_items}>
                {listItems}
            </div>
        </div>
    )
}

export default ListRestaurants