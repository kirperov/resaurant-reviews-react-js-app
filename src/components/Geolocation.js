import { useState } from "react";

const Geolocation = ({position}) => {
    const [address, setAddress] = useState('');

    const getLocation = () => {
         position(address)
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