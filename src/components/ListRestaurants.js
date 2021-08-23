import style from '../assets/styles/list_restaurants.module.css';
import DetailRestaurant from '../components/DetailRestaurant';
import Search from '../components/Search';
import ReviewRestaurant from '../components/ReviewRestaurant';

const ListRestaurants = (sortedRestaurants) => {

    const listItems = sortedRestaurants.listRestaurants.map((restaurant, index) =>
    <div key={restaurant.restaurantName}>
        <div className={style.list_restaurants_item}>
            <div className={style.restaurant_infos}>
                <span>{restaurant.restaurantName}</span>
                <span>Address: {restaurant.address}</span>
                <ReviewRestaurant restaurantRating={restaurant.ratings}></ReviewRestaurant>
            </div>
            <div className={style.restaurant_rating} ><DetailRestaurant selectedRestaurant={restaurant}></DetailRestaurant></div>
        </div>
    </div>
);

    return (
        
        <div className={style.container_restaurants}>
            <Search></Search>
            <div className={style.list_restaurants_items}>
                {listItems}
            </div>
        </div>
    )
}

export default ListRestaurants