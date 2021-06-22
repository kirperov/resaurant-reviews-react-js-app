import { useState } from "react";

const Geolocation = ({position}) => {
    const [address, setAddress] = useState('');
    // const addressURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_API_KEY}`;

    const getLocation = () => {
         position(address)
        // fetch(addressURL)
        // .then((response) => {
        //     return response.json();
        // }).then((response) => {
        //     return position(response.results[0].formatted_address);
        // })
        // .catch((error) =>  {
        //     console.log('Error during fetch ' + error.message);
        //     return position("Paris");
        // })
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