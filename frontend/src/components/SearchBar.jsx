import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query); // Wywołanie funkcji onSearch przekazanej z MainPage
        setQuery(''); // Wyczyść pole po wyszukaniu
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Wyszukaj samochód..."
                    value={query}
                    onChange={handleChange}
                    required
                />
                <button className="btn btn-primary" type="submit">
                    Wyszukaj
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
