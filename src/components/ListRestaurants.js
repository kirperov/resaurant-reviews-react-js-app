import style from '../assets/styles/list_restaurants.module.css';
import Search from '../components/Search';
import { restaurants } from '../assets/restaurants';
console.log(restaurants)

const listItems = restaurants.map((restaurant) => 
    <div key={restaurant.restaurantName}>
        <div className={style.list_restaurants_item}>
            <div className={style.restaurant_infos}>
                <span>{restaurant.restaurantName}</span>
                <span>Address: {restaurant.address}</span>
            </div>
        </div>
    </div>);

const ListRestaurants = () => {
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