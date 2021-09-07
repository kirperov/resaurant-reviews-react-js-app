import style from '../assets/styles/filter.module.css';
import { useState, useEffect } from "react";

const Filter = ({callbackFilter}) => {
    const [filterMin, setFilterMin] = useState(1);
    const [filterMax, setFilterMax] = useState(5);

    const handleChangeMin = event => {
        setFilterMin(parseInt(event.target.value))
    }

    const handleChangeMax = event => {
        setFilterMax(parseInt(event.target.value))
    }

    useEffect(() => {
        callbackFilter(filterMin, filterMax)
    },[filterMin, filterMax])
    return (
        <div className={style.filter_container}>
            <label>Filter by stars </label>
            <form>
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
            </form>
        </div>
    )
}

export default Filter