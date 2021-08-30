import style from '../assets/styles/filter.module.css';
import { useState } from "react";

const Filter = ({callbackFilter}) => {
    const [filterMin, setFilterMin] = useState(1);
    const [filterMax, setFilterMax] = useState(1);

    const handleChangeMin = event => {
        setFilterMin(parseInt(event.target.value))
        event.preventDefault();
    }

    const handleChangeMax = event => {
        setFilterMax(parseInt(event.target.value))
        event.preventDefault()
    }

    const handleSubmit = event => {
        callbackFilter(filterMin, filterMax)
        event.preventDefault();
    }

    return (
        <div className={style.filter_container}>
            <label>Filter by stars </label>
            <form onSubmit={handleSubmit}>
                <span>Min </span>
                <select onChange={handleChangeMin}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <span>Max </span>
                <select onChange={handleChangeMax}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <input type="submit" value="Filter"/>
            </form>
        </div>
    )
}

export default Filter