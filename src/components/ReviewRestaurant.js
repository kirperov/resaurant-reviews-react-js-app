import StarRatings from 'react-star-ratings';

const ReviewRestaurant = (restaurantRating) => {
// const arr = []
// const average = (array) => array.reduce((a, b) => a + b) / array.length;

// restaurantRating.restaurantRating.map(rating => arr.push(rating.stars))

    return (
        <div>
            <StarRatings
                // rating={average(arr)}
                rating={restaurantRating.restaurantRating}
                starRatedColor="blue"
                numberOfStars={5}
                starDimension="2em"
                name='rating'
            />
        </div>
    )
}

export default ReviewRestaurant