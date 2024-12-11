// src/components/CarDetails.jsx
import React from 'react';
import '../css/CarPage.css';

const CarDetails = ({ car }) => {
    console.log(car)
    return (
        <div className="car-details">
            <h2>Informacje o pojeździe</h2>
            <ul>
                <li>Przebieg: {car.mileage}</li>
                <li>Rodzaj paliwa: {car.fuel}</li>
                <li>Skrzynia biegów: {car.gearbox}</li>
                <li>Moc: {car.horsePower}</li>
            </ul>
        </div>
    );
};

export default CarDetails;
