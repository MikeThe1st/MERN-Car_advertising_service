// src/pages/BuyCar.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CarCard from '../components/CarCard';
import '../css/BuyCar.css';
import Navbar from '../components/Navbar';
import AdvancedSearch from "../components/AdvancedSearch";
import SearchBar from '../components/SearchBar';
import axios from 'axios';

const BuyCar = () => {

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:3000/backend/cars/get-cars');
                setCars(response.data);
            } catch (err) {
                console.error("Error fetching car data:", err);
                setError("Failed to load cars. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    if (loading) return <div className="loading">Loading cars...</div>;
    if (error) return <div className="error">{error}</div>;


    return (
        <div className="buy-car-page buy-car-body">
            <Navbar />
            <AdvancedSearch />
            <SearchBar />
            <div className="car-list">
                {cars.map((car) => (
                    <CarCard key={car._id} car={car} />
                ))}
            </div>
        </div>
    );
};

export default BuyCar;