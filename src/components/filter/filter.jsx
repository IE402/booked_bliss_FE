import React, { useState, useEffect } from 'react';
import './filter.scss';
import { useSearchParams } from "react-router-dom";

function Filter() {
    const [searchParams, setSearchParams] = useSearchParams();

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
                <h3>Filter By: Type</h3>
                {['Buy', 'Rent'].map((type, index) => (
                    <label key={index}>
                        <input
                            type="checkbox"
                            checked={query.type.split(',').includes(type)}
                            onChange={() => handleCheckboxChange('type', type)}
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
                        />
                        {query.minPrice}
                    </label>
                    <label className="slider-item">
                        Max:
                        <input
                            type="range"
                            min="1000000"
                            max="20000000"
                            value={query.maxPrice}
                            onChange={(e) => handleSliderChange("maxPrice", e.target.value)}
                        />
                        {query.maxPrice}
                    </label>
                </div>
            </div>
            <div className="filter-section">
                <h3>Filter By: Location</h3>
                {['Any', 'Tan Phu', 'Tang Nho Phu A', 'Linh trung', 'Linh Xuan', 'Long Thanh My', 'Di An'].map((location, index) => (
                    <label key={index}>
                        <input
                            type="checkbox"
                            checked={query.city.split(',').includes(location)}
                            onChange={() => handleCheckboxChange('city', location)}
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
                            checked={query.property.split(',').includes(type)}
                            onChange={() => handleCheckboxChange('property', type)}
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
                        />
                        {query.bedroom}
                    </label>
                </div>
            </div>
        </div>
    );
}

export default Filter;
