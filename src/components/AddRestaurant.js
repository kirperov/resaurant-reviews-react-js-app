import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Autocomplete } from "@react-google-maps/api";
import style from "../assets/styles/add_restaurant.module.css";

let autocomplete = null;
const AddRestaurant = ({ callbackAddRestaurant }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [lat, setLat] = useState({ lat: 0 });
  const [long, setLong] = useState({ long: 0 });
  const [newRestaurant, setNewRestaurant] = useState({});
  const onLoad = (autocompleted) => {
    autocomplete = autocompleted;
  };

  const onPlaceChanged = () => {
    try {
      setAddress(autocomplete.getPlace().formatted_address);
      setLat(autocomplete.getPlace().geometry.location.lat());
      setLong(autocomplete.getPlace().geometry.location.lng());
    } catch (error) {}
  };

  const addRestaurant = () => {
    setNewRestaurant({
      place_id: 1,
      restaurantName: name,
      address: address,
      lat: lat,
      long: long,
      rating: 0,
      user_ratings_total: 0,
    });
  };

  useEffect(() => {
    callbackAddRestaurant(newRestaurant);
  }, [newRestaurant]);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add new restaurant
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new restaurant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label><strong>Name:</strong></label>
            <input
              className={style.add_restaurant_input}
              onChange={(event) => {
                setName(event.target.value);
              }}
              type="text"
              placeholder="Enter name ..."
            />
            <br />
            <label><strong>Address:</strong></label>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <input
                className={style.add_restaurant_input}
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
                type="text"
                placeholder="Enter address ..."
              />
            </Autocomplete>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={addRestaurant}>
            Add
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddRestaurant;
