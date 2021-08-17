const ReviewRestaurant = (restaurantRating) => {

const arr = []
const average = (array) => array.reduce((a, b) => a + b) / array.length;

restaurantRating.restaurantRating.map(rating => {
    arr.push(rating.stars)
})

    return (
        <div>
            <div>
                {average(arr)}
            </div>
        </div>
    )
}

export default ReviewRestaurant