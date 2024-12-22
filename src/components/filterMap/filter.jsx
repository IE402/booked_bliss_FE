import React, { useState, useEffect, useContext } from "react";
import "./filter.scss";
import { useSearchParams } from "react-router-dom";
import { Universitys } from "../../data/university";
import { RADIUS_OPTIONS } from "../map/setUp";
function Filter({ showUniversitys, setSelectUniversity, set_R }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [geojsonData, setGeojsonData] = useState(null);
  const [r, setR] = useState(RADIUS_OPTIONS[0].value);

  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || 0,
    maxPrice: searchParams.get("maxPrice") || 20000000,
    bedroom: searchParams.get("bedroom") || 1,
  });

  // Cập nhật searchParams mỗi khi query thay đổi
  useEffect(() => {
    setSearchParams(query);
  }, [query, setSearchParams]); // Chạy khi query thay đổi
  useEffect(() => {
    const loadGeoJSON = async () => {
      try {
        const response = await fetch("src/components/map/data.json");
        if (!response.ok) throw new Error("Failed to load GeoJSON data");
        const data = await response.json();
        setGeojsonData(data.features);
      } catch (error) {
        console.error("Error loading GeoJSON:", error);
      }
    };

    loadGeoJSON();
  }, []);

  const handleCheckboxChange = (field, value) => {
    const values = query[field] ? query[field].split(",") : [];
    const updatedValues = values.includes(value)
      ? values.filter((item) => item !== value)
      : [...values, value];

    setQuery({ ...query, [field]: updatedValues.join(",") });
  };

  const handleSliderChange = (field, value) => {
    setQuery({ ...query, [field]: value });
  };

  return (
    <div className="filter-sidebar">
      <div className="filter-section">
        <h3>Lọc theo: Khu vực</h3>

        {geojsonData &&
          geojsonData.map((location, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={query.city.split(",").includes(location.name)}
                onChange={() => handleCheckboxChange("city", location.name)}
              />
              {location.name}
            </label>
          ))}
      </div>
      <div className="filter-section">
        <h3>Xung quanh Trường đại học</h3>
        <select onChange={(e) => set_R(e.target.value)}>
          {RADIUS_OPTIONS.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {showUniversitys &&
          Universitys.map((item, index) => (
            <label key={index} onClick={() => setSelectUniversity(item)}>
              <input type="radio" name="university" />
              {item.name}
            </label>
          ))}
      </div>
    </div>
  );
}

export default Filter;
