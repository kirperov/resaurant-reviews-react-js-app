import React from 'react';
import style from '../assets/styles/detail_restaurant.module.css';
import { useRef, useState} from "react";

const AddReview =(selectedRestaurant) => {
    // console.log(selectedRestaurant)

    return (
    <div >
        <div>
        <span><strong>Add review: </strong></span>
        <textarea className={style.detail_restaurant_add_review} placeholder='Write something ...'></textarea>
        <button className={style.detail_restaurant_add_reviw_btn}>Add new</button>
      </div>
    </div>
    )
}

export default AddReview;