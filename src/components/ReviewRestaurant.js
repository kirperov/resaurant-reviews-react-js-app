import StarRatings from 'react-star-ratings';

const ReviewRestaurant = (restaurantRating) => {

const arr = []
const average = (array) => array.reduce((a, b) => a + b) / array.length;

restaurantRating.restaurantRating.map(rating => arr.push(rating.stars))

    return (
        <div>
            <div> 
                <StarRatings
                    rating={average(arr)}
                    starRatedColor="blue"
                    changeRating={average(arr)}
                    numberOfStars={5}
                    name='rating'
                    />
            </div>
        </div>
    )
}

export default ReviewRestaurant