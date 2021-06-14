import { useRef, useState } from "react";

const Geolocation = (props) => {
    const [title, setTitle] = useState('')
    let textInput = useRef(null);
    
    function geocode() {
        console.log(title)
        let location = title;
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            console.log(JSON.parse(this.responseText))
        }
        xhttp.open("GET", `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.REACT_APP_API_KEY}`);
        xhttp.send();
    }


    return (
    <div>
        <input
            type="text"
            ref={textInput} 
            onChange={event => setTitle(event.target.value)}
        />   

        <input
            type="button"
            value="Focus the text input"
            onClick={geocode}
        />
    </div>
    )
}

export default Geolocation