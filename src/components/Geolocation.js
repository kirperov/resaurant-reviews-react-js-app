import { useState } from "react";

const Geolocation = ({position}) => {
    const [address, setAddress] = useState('');
    const addressURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_API_KEY}`;

    const getLocation = () => {
        fetch(addressURL)
        .then((response) => {
            return response.json();
        }).then((response) => {
            position(response.results[0].formatted_address);
        })
    }

    return (
        <div>
            <input
                type="text"
                onChange={event => setAddress(event.target.value)}
            />   

            <input
                type="button"
                value="Find address"
                onClick={ getLocation }
            />
        </div>
    )
}

export default Geolocation