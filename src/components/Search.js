import style from '../assets/styles/search.module.css';
import { useState } from "react";

function Search() {
    const [filterMin, setFilterMin] = useState(1);
    const [filterMax, setFilterMax] = useState(5);

    const handleChangeMin = event => {
        setFilterMin(event.target.value)
        console.log(event.target.value)
        event.preventDefault();
    }

    const handleChangeMax = event => {
        setFilterMax(event.target.value)
        event.preventDefault()
    }
    console.log("filterMin "+ filterMin + "filterMax " + filterMax)

    return (
        <div className={style.filter_container}>
            <label>Sort by stars </label>
            <form>
                <span>Min </span>
                <select onChange={handleChangeMin}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="3">4</option>
                    <option value="3">5</option>
                </select>
                <span>Max </span>
                <select onChange={handleChangeMax}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="3">4</option>
                    <option value="3">5</option>
                </select>
                <input type="button" value="Filter"/>
            </form>
        </div>
    )
}

export default Search