import { useState } from 'react';
import './searchBar.scss';
const types = ["buy", "rent"]
import { Link } from "react-router-dom"

function SearchBar() {
    const [query, setQuery] = useState({
        type: "buy",
        location: "",
        minPrice: 0,
        maxPrice: 0,
    });
    const switchType = (val) => {
        setQuery(prev => ({ ...prev, type: val }));
    }

    const handleChange = e => {
        setQuery(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="searchBar">
            <div className="type">
                {types.map(type => (
                    <button key={type} onClick={() => switchType(type)} className={query.type === type ? "active" : ""}>
                        {type}</button>
                ))}
            </div>
            <div className="searchField">
                <div className="field location">
                    <img src="/loca.png" alt="" />
                    <input type="text" name="city" placeholder="City Location" onChange={handleChange}/>
                </div>
                <div className="field minPrice">
                    <img src="/price.png" alt="" />
                    <input type="number" name="minPrice" min={0} max={10000000} placeholder="Min Price" onChange={handleChange}/>
                </div>
                <div className="field maxPrice">
                    <img src="/price.png" alt="" />
                    <input type="number" name="maxPrice" min={0} max={10000000} placeholder="Max Price" onChange={handleChange} />
                </div>
                <Link to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}>
                    <div className="searchBtn">
                        <button>Search</button>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default SearchBar