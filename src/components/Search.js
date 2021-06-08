import style from '../assets/styles/search.module.css';

function Search() {
    return (
        <div className={style.filter_container}>
            <label>Sort by star</label>
            <form>
                <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="3">4</option>
                    <option value="3">5</option>
                </select>
            </form>
        </div>
    )
}

export default Search