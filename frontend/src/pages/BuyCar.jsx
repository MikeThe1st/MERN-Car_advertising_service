// src/pages/BuyCar.jsx
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CarCard from '../components/CarCard';
import '../css/BuyCar.css';
import Navbar from '../components/Navbar';
const BuyCar = () => {
    const cars = [
        { id: 1, image: 'link-do-zdjecia', name: 'BMW Seria 3 320d', engineSize: 1995, horsepower: 177, features: 'LIFT, Xenon', location: 'Elbląg (Warmińsko-mazurskie)', timeAgo: '2 minuty temu', sellerType: 'Prywatny sprzedawca', price: '19 900' },
        { id: 2, image: 'link-do-zdjecia', name: 'BMW X2', engineSize: 1499, horsepower: 170, features: 'M Sport', location: 'Chorzów (Śląskie)', timeAgo: '2 minuty temu', sellerType: 'Autoryzowany salon', price: '192 200' },
        { id: 3, image: 'link-do-zdjecia', name: 'BMW X6', engineSize: 2993, horsepower: 298, features: 'Gotowy do odbioru', location: 'Warszawa (Mazowieckie)', timeAgo: '5 minut temu', sellerType: 'Autoryzowany salon', price: '426 300' },
        { id: 4, image: 'link-do-zdjecia', name: 'BMW Seria 5 520d', engineSize: 1995, horsepower: 190, features: 'Sport Line', location: 'Poznań (Wielkopolskie)', timeAgo: '10 minut temu', sellerType: 'Prywatny sprzedawca', price: '85 000' },
        { id: 5, image: 'link-do-zdjecia', name: 'BMW Seria 7 730d', engineSize: 2993, horsepower: 265, features: 'Luxury Line', location: 'Kraków (Małopolskie)', timeAgo: '15 minut temu', sellerType: 'Prywatny sprzedawca', price: '130 000' },
        { id: 6, image: 'link-do-zdjecia', name: 'BMW X5', engineSize: 2998, horsepower: 340, features: 'xDrive40i', location: 'Gdańsk (Pomorskie)', timeAgo: '20 minut temu', sellerType: 'Prywatny sprzedawca', price: '320 000' },
        { id: 7, image: 'link-do-zdjecia', name: 'BMW Seria 1 118i', engineSize: 1499, horsepower: 140, features: 'Sport Line', location: 'Wrocław (Dolnośląskie)', timeAgo: '30 minut temu', sellerType: 'Autoryzowany salon', price: '105 000' },
        { id: 8, image: 'link-do-zdjecia', name: 'BMW M4 Coupe', engineSize: 2993, horsepower: 510, features: 'Competition', location: 'Łódź (Łódzkie)', timeAgo: '45 minut temu', sellerType: 'Prywatny sprzedawca', price: '480 000' },
        { id: 9, image: 'link-do-zdjecia', name: 'BMW Z4 Roadster', engineSize: 1998, horsepower: 258, features: 'sDrive30i', location: 'Szczecin (Zachodniopomorskie)', timeAgo: '1 godzina temu', sellerType: 'Autoryzowany salon', price: '220 000' }
    ];

 
    return (
        <div className="buy-car-page buy-car-body">
            <Navbar />
            <div className="car-list">
                {cars.map((car) => (
                    <CarCard key={car.id} car={car} />
                ))}
            </div>
        </div>
    );
};

export default BuyCar;