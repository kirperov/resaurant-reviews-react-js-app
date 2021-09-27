import React from 'react';
import style from '../assets/styles/detail_restaurant.module.css';
import ChangeRating from '../components/ChangeRating';
import {useState, useEffect} from "react";

const AddReview =({callbackReviw}) => {

    const [comment, setComment] = useState();
    const [rating, setRating] = useState();

    const callbackRating = (rating) => {
        setRating(rating)
    }

  useEffect(() => {
    callbackReviw(rating, comment)
  },[rating, comment]);

    return (
        <div>
            <textarea 
                onChange={(event) => {
                    setComment(event.target.value);
                }}
                className={style.detail_restaurant_add_review}
                placeholder='Write something ...'>    
            </textarea>
            <ChangeRating callbackRating={callbackRating}/>
        </div>
    )
}

export default AddReview;