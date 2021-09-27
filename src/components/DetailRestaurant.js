import React from 'react';
import { useState, useEffect } from "react";
import style from '../assets/styles/detail_restaurant.module.css';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import StarRatings from 'react-star-ratings';
import ReactStreetview from 'react-streetview';
import AddReview from './AddReview';

const DetailRestaurant = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState();

  const updateRestaurant = () => {
    props.selectedRestaurant.ratings.push({stars: newRating, comment: newComment})
    props.callbackReviw(props.selectedRestaurant, props.index);
  };

  const getCallbackReview = (rating, comment) => {
    setNewRating(rating);
    setNewComment(comment);
  };

  // see https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewPanoramaOptions
  const streetViewPanoramaOptions = {
    position: {lat: props.selectedRestaurant.lat, lng: props.selectedRestaurant.long},
    pov: {heading: 100, pitch: 0},
    zoom: 1
  };

  const listItems = 
  <div className={style.detail_restaurant_container} key={props.selectedRestaurant.restaurantName}>
      <div style={{
        width: '100%',
        height: '450px',
        backgroundColor: '#eeeeee'
      }}>
      <ReactStreetview
        apiKey={process.env.REACT_APP_API_KEY}
        streetViewPanoramaOptions={streetViewPanoramaOptions}
      />
    </div>
    <div className={style.detail_restaurant_address}>
      <span><strong>Address: </strong></span> <span>{props.selectedRestaurant.address}</span></div>
    <div className={style.detail_restaurant_comments}>
    <AddReview callbackReviw={getCallbackReview}/>
        <Button variant="primary" onClick={updateRestaurant}>
          Add new review
      </Button>

      <div>
        <span><strong>Comments: </strong></span>
      </div>
      {
        props.selectedRestaurant.ratings.map(rating => 
        {
          return <div className={style.detail_restaurant_comment}>
                  <StarRatings
                    rating={rating.stars}
                    starRatedColor="blue"
                    numberOfStars={5}
                    starDimension="1em"
                    name='rating'
                  />{ rating.comment }
                </div>
        })
      }
    </div>
  </div>
 
  return (
      <>
      <Button variant="primary" onClick={handleShow}>
        Details
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.selectedRestaurant.restaurantName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { listItems }

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DetailRestaurant