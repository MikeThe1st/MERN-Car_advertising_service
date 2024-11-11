// src/components/CarDetails.jsx
import React from 'react';
import '../css/CarPage.css';

const CarDetails = ({ car }) => {
    return (
        <div className="car-details">
            <h2>Najważniejsze</h2>
            <ul>
                <li>Przebieg: {car.mileage}</li>
                <li>Rodzaj paliwa: {car.fuelType}</li>
                <li>Skrzynia biegów: {car.gearbox}</li>
                <li>Typ nadwozia: {car.bodyType}</li>
                <li>Pojemność skokowa: {car.engineSize}</li>
                <li>Moc: {car.horsepower}</li>
            </ul>
        </div>
    );
};

export default CarDetails;
