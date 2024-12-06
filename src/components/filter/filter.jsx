import React, { useState } from 'react';
import './filter.scss';
import { useSearchParams } from "react-router-dom";

function Filter() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [query, setQuery] = useState({
        type: searchParams.get("type") || "",
        city: searchParams.get("city") || "",
        property: searchParams.get("property") || "",
        minPrice: searchParams.get("minPrice") || 0,
        maxPrice: searchParams.get("maxPrice") || 1000000,
        bedroom: searchParams.get("bedroom") || 1,
    });

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

    const handleFilter = () => {
        setSearchParams(query);
    };

    return (
        <div className="filter-sidebar">
            <div className="filter-section">
                <h3>Filter By: Type</h3>
                {['Buy', 'Rent'].map((type, index) => (
                    <label key={index}>
                        <input
                            type="checkbox"
                            checked={query.type.includes(type)}
                            onChange={() => handleCheckboxChange('type', type)}
                            defaultValue={query.type}
                        />
                        {type}
                    </label>
                ))}
            </div>
            <div className="filter-section">
                <h3>Filter By: Price</h3>
                <div className="slider-container">
                    <label className="slider-item">
                        Min:
                        <input
                            type="range"
                            min="1"
                            max="10000"
                            value={query.minPrice}
                            onChange={(e) => handleSliderChange("minPrice", e.target.value)}
                            defaultValue={query.minPrice}
                        />
                        {query.minPrice}
                    </label>
                    <label className="slider-item">
                        Max:
                        <input
                            type="range"
                            min="10000"
                            max="200000"
                            value={query.maxPrice}
                            onChange={(e) => handleSliderChange("maxPrice", e.target.value)}
                            defaultValue={query.maxPrice}
                        />
                        {query.maxPrice}
                    </label>
                </div>
            </div>
            <div className="filter-section">
                <h3>Filter By: Location</h3>
                {['Any', 'Ho Chi Minh', 'Ha Noi', 'Binh Dinh', 'Binh Duong', 'Hai Phong', 'London'].map((location, index) => (
                    <label key={index}>
                        <input
                            type="checkbox"
                            checked={query.city.includes(location)}
                            onChange={() => handleCheckboxChange('city', location)}
                            defaultValue={query.location}
                        />
                        {location}
                    </label>
                ))}
            </div>
            <div className="filter-section">
                <h3>Filter By: Property</h3>
                {['House', 'Apartment', 'Condo', 'Land'].map((type, index) => (
                    <label key={index}>
                        <input
                            type="checkbox"
                            checked={query.property.includes(type)}
                            onChange={() => handleCheckboxChange('property', type)}
                            defaultValue={query.property}
                        />
                        {type}
                    </label>
                ))}
            </div>
            <div className="filter-section">
                <h3>Filter By: Bedroom</h3>
                <div className="slider-container">
                    <label className="slider-item">
                        Bedroom:
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={query.bedroom}
                            onChange={(e) => handleSliderChange("bedroom", e.target.value)}
                            defaultValue={query.bedroom}
                        />
                        {query.bedroom}
                    </label>
                </div>
            </div>
            <div className="filter-btn">
                <button className='filter-update' onClick={handleFilter}>Update</button>
            </div>
        </div>
    );
}

export default Filter;
