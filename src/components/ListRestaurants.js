import style from '../assets/styles/list_restaurants.module.css';

const ListRestaurants = () => {
    return (
        <div className={style.list_restaurants}>
            <div>
                <div>
                    <span>Reasto 1</span>
                    <span>Address: Lorem ipsum</span>
                </div>
                <div>
                    <span>Reasto 2</span>
                    <span>Address: Lorem ipsum</span>
                </div>
                <div>
                    <span>Reasto 3</span>
                    <span>Address: Lorem ipsum</span>
                </div>
                <div>
                    <span>Reasto 4</span>
                    <span>Address: Lorem ipsum</span>
                </div>
                <div>
                    <span>Reasto 5</span>
                    <span>Address: Lorem ipsum</span>
                </div>
            </div>
        </div>
    )
}

export default ListRestaurants