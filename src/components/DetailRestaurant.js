import { useState } from "react";
import style from '../assets/styles/map_section.module.css';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

const DetailRestaurant = (selectedRestaurant) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const listItems = 
    <div key={selectedRestaurant.selectedRestaurant.restaurantName}>
        <div>
            <div>
                <span>{selectedRestaurant.selectedRestaurant.restaurantName}</span>
                <span>Address: {selectedRestaurant.selectedRestaurant.address}</span>
                <span> Comment:
                    {
                        selectedRestaurant.selectedRestaurant.ratings.map(rating => {
                            return rating.comment;
                        })
                    }
                </span>
            </div>
        </div>
    </div>
 
    return (
        <>
        <Button variant="primary" onClick={handleShow}>
          Detail
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedRestaurant.selectedRestaurant.restaurantName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { listItems }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
}

export default DetailRestaurant