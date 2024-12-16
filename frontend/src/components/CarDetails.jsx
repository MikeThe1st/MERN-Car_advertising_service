// src/components/CarDetails.jsx
import React from 'react';
import '../css/CarPage.css';

const CarDetails = ({ car }) => {
    return (
        <div className="car-details">
            <h2>Informacje o pojeździe</h2>
            <ul>
                <li>Przebieg: {car.mileage} km</li>
                <li>Rodzaj paliwa: {car.fuel}</li>
                <li>Skrzynia biegów: {car.gearbox}</li>
                <li>Moc silnika: {car.horsePower} KM</li>
                <li>Czy uszkodzone? {car.is_damaged ? 'Tak' : 'Nie'}</li>
            </ul>
        </div>
    );
};

export default CarDetails;
