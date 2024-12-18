import { useState } from "react";
import "./searchBar.scss";
const types = ["Thuê", "Mua"];
import { Link } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState({
    type: "rent",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });
  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="searchField">
        <div className="field location">
          <img src="/loca.png" alt="" />
          {/* <input type="text" name="city" placeholder="City Location" onChange={handleChange}/> */}
          <select name="city" onChange={handleChange}>
            <option value="">Chọn Quận/Huyện</option>
            <option value="Di An">Di An</option>
            <option value="Long Thanh My">Long Thạnh Mỹ</option>
            <option value="Tan Phu">Tân Phú</option>
            <option value="Linh Trung">Linh Trung</option>
            <option value="Linh Xuan">Linh Xuân</option>

          </select>
        </div>
        <div className="field minPrice">
          <img src="/price.png" alt="" />
          <input
            type="number"
            name="minPrice"
            min={0}
            max={10000000}
            placeholder="Min Price"
            onChange={handleChange}
          />
        </div>
        <div className="field maxPrice">
          <img src="/price.png" alt="" />
          <input
            type="number"
            name="maxPrice"
            min={0}
            max={10000000}
            placeholder="Max Price"
            onChange={handleChange}
          />
        </div>
        <Link
          to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
        >
          <div className="searchBtn">
            <button>Tìm kiếm</button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SearchBar;
