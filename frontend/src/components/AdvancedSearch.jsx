// src/components/AdvancedSearch.jsx
import React, { useState } from 'react';
import '../css/AdvancedSearch.css';

const AdvancedSearch = ({ onSearch }) => {
    const [filters, setFilters] = useState({
        brand: '',
        model: '',
        generation: '',
        bodyType: '',
        minPrice: '',
        maxPrice: '',
        minYear: '',
        maxYear: '',
        fuelType: '',
        minMileage: '',
        maxMileage: '',
        location: '',
        damageStatus: '',
        searchText: '',
        financing: false,
        specialPrograms: '',
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(filters); // Przekazujemy filtry do komponentu nadrzędnego
    };

    return (
        <div className="advanced-search-horizontal">
            <form onSubmit={handleSearch} className="search-form-horizontal">
                <select name="brand" value={filters.brand} onChange={handleInputChange}>
                    <option value="">Marka pojazdu</option>
                    <option value="Mercedes">Mercedes</option>
                    <option value="BMW">BMW</option>
                </select>

                <select name="model" value={filters.model} onChange={handleInputChange}>
                    <option value="">Model pojazdu</option>
                </select>

                <select name="generation" value={filters.generation} onChange={handleInputChange}>
                    <option value="">Generacja</option>
                </select>

                <select name="bodyType" value={filters.bodyType} onChange={handleInputChange}>
                    <option value="">Typ nadwozia</option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                </select>

                <input
                    type="number"
                    name="minPrice"
                    placeholder="Cena od"
                    value={filters.minPrice}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="maxPrice"
                    placeholder="Cena do"
                    value={filters.maxPrice}
                    onChange={handleInputChange}
                />

                <input
                    type="number"
                    name="minYear"
                    placeholder="Rok produkcji od"
                    value={filters.minYear}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="maxYear"
                    placeholder="Rok produkcji do"
                    value={filters.maxYear}
                    onChange={handleInputChange}
                />

                <select name="fuelType" value={filters.fuelType} onChange={handleInputChange}>
                    <option value="">Rodzaj paliwa</option>
                    <option value="Benzyna">Benzyna</option>
                    <option value="Diesel">Diesel</option>
                </select>

                <input
                    type="number"
                    name="minMileage"
                    placeholder="Przebieg od"
                    value={filters.minMileage}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="maxMileage"
                    placeholder="Przebieg do"
                    value={filters.maxMileage}
                    onChange={handleInputChange}
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Lokalizacja"
                    value={filters.location}
                    onChange={handleInputChange}
                />

                <select
                    name="damageStatus"
                    value={filters.damageStatus}
                    onChange={handleInputChange}
                >
                    <option value="">Stan uszkodzeń</option>
                    <option value="Nieuszkodzony">Nieuszkodzony</option>
                    <option value="Uszkodzony">Uszkodzony</option>
                </select>

                <input
                    type="text"
                    name="searchText"
                    placeholder="Model, wersja lub inne szczegóły"
                    value={filters.searchText}
                    onChange={handleInputChange}
                />

                <div className="form-group-inline">
                    <input
                        type="checkbox"
                        name="financing"
                        checked={filters.financing}
                        onChange={handleInputChange}
                    />
                    <label>Możliwość finansowania</label>
                </div>

                <select
                    name="specialPrograms"
                    value={filters.specialPrograms}
                    onChange={handleInputChange}
                >
                    <option value="">Programy specjalne</option>
                </select>

                {/* <button type="submit" className="search-button">
                    Szukaj
                </button>
                <button className="show-more-button">Pokaż więcej filtrów</button> */}
            </form>
        </div>
    );
};

export default AdvancedSearch;
