import style from '../assets/styles/list_restaurants.module.css';
import DetailRestaurant from '../components/DetailRestaurant';
import ReviewRestaurant from '../components/ReviewRestaurant';

const ListRestaurants = (props) => {
    const getCallbackReview = (selectedRestaurant, index) => {
        props.listRestaurants[index] = selectedRestaurant
        props.callbackReview(props.listRestaurants)
    };

    const listItems = props.listRestaurants.map((restaurant, index) =>
    <div key={restaurant.restaurantName+restaurant.place_id}>
        <div className={style.list_restaurants_item}>
            <div className={style.restaurant_infos}>
                <span>{restaurant.restaurantName}</span>
                <span>Address: {restaurant.address}</span>
                <ReviewRestaurant restaurantRating={restaurant.rating}></ReviewRestaurant>
            </div>
            <div className={style.restaurant_rating}>
                <span>Ratings ({restaurant.user_ratings_total})</span>
                <DetailRestaurant selectedRestaurant={restaurant} callbackReviw={getCallbackReview} index={index} service={props.service}/>
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