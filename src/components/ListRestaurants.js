import style from '../assets/styles/list_restaurants.module.css';
import Search from '../components/Search';
const ListRestaurants = () => {
    return (
        <div className={style.container_restaurants}>
            <Search></Search>
                <div className={style.list_restaurants_items}>
                    <div className={style.list_restaurants_item}>
                        <div className={style.restaurant_infos}>
                            <span>Reasto 1</span>
                            <span>Address: Lorem ipsum</span>
                        </div>
                    </div>
                    <div className={style.list_restaurants_item}>
                        <div className={style.restaurant_infos}>
                            <span>Reasto 2</span>
                            <span>Address: Lorem ipsum</span>
                        </div>
                    </div>
                    <div className={style.list_restaurants_item}>
                        <div className={style.restaurant_infos}>
                            <span>Reasto 3</span>
                            <span>Address: Lorem ipsum</span>
                        </div>
                    </div>
                    <div className={style.list_restaurants_item}>
                        <div className={style.restaurant_infos}>
                            <span>Reasto 4</span>
                            <span>Address: Lorem ipsum</span>
                        </div>
                    </div>
                    <div className={style.list_restaurants_item}>
                        <div className={style.restaurant_infos}>
                            <span>Reasto 5</span>
                            <span>Address: Lorem ipsum</span>
                        </div>
                    </div>
                
            </div>
        </div>

    )
}

export default ListRestaurants