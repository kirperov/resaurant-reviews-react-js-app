import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Autocomplete } from "@react-google-maps/api";
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
      restaurantName: name,
      address: address,
      lat: lat,
      long: long,
      ratings: [
        {
          stars: 0,
          comment: "",
        },
      ],
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
            Name:
            <input
              onChange={(event) => {
                setName(event.target.value);
              }}
              type="text"
            />
            <br />
            Address:
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <input
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
                type="text"
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
