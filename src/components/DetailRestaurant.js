import React from "react";
import { useState } from "react";
import style from "../assets/styles/detail_restaurant.module.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import StarRatings from "react-star-ratings";
import ReactStreetview from "react-streetview";
import AddReview from "./AddReview";

const DetailRestaurant = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  const [newUsername, setNewUsername] = useState();
  const [newComment, setNewComment] = useState();
  const [newRating, setNewRating] = useState(0);
  const [reviewsRestaurant, setReviewsRestaurant] = useState();
  const handleService = () => {
    if(props.selectedRestaurant.place_id) {
      props.service.getDetails(
        {
          placeId: props.selectedRestaurant.place_id,
        },
        function (place, status) {
          setReviewsRestaurant(place);
        }
      );
    }
  };

  const handleOnClick = () => {
    handleService();
    handleShow();
  };

  const updateRestaurant = () => {
    reviewsRestaurant.reviews.push({
      author_name: newUsername,
      rating: newRating,
      text: newComment,
    });
  };

  const getCallbackReview = (rating, comment, username) => {
    setNewUsername(username);
    setNewComment(comment);
    setNewRating(rating);
  };

  // see https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewPanoramaOptions
  const streetViewPanoramaOptions = {
    position: {
      lat: props.selectedRestaurant.lat,
      lng: props.selectedRestaurant.long,
    },
    pov: { heading: 100, pitch: 0 },
    zoom: 1,
  };

  const listItems = (
    <div
      className={style.detail_restaurant_container}
      key={props.selectedRestaurant.restaurantName}
    >
      <div className={style.detail_restaurant_street_view}>
        <ReactStreetview
          apiKey={process.env.REACT_APP_API_KEY}
          streetViewPanoramaOptions={streetViewPanoramaOptions}
        />
      </div>
      <div className={style.detail_restaurant_address}>
        <span>
          <strong>Address: </strong>
        </span>
        <span>{props.selectedRestaurant.address}</span>
      </div>
      <div className={style.detail_restaurant_comments}>
        <AddReview callbackReviw={getCallbackReview} />
        <Button variant="primary" onClick={updateRestaurant}>
          Add new review
        </Button>
        <div>
          <span>
            <strong>
              Comments: ({reviewsRestaurant ? reviewsRestaurant.reviews.length : ""}{"0"})
            </strong>
          </span>
        </div>
        {reviewsRestaurant
          ? reviewsRestaurant.reviews.map((review, index) => {
              return (
                <div key={index} className={style.detail_restaurant_comment}>
                  <span>
                    <strong>Author: </strong>
                    {review.author_name}
                  </span>
                  <span>
                    <strong>Date: </strong>
                    {review.relative_time_description}
                  </span>
                  <StarRatings
                    rating={review.rating}
                    starRatedColor="blue"
                    numberOfStars={5}
                    starDimension="1em"
                    name="rating"
                  />
                  {review.text}
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );

  return (
    <>
      <Button className="me-2" onClick={() => handleShow(true)} variant="primary" onClick={handleOnClick}>
        Details
      </Button>
      <Modal fullscreen={true} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.selectedRestaurant.restaurantName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{listItems}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DetailRestaurant;
