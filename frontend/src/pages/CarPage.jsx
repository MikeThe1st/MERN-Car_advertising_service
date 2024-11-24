// src/pages/CarPage.jsx
import React from 'react';
import ImageGallery from '../components/ImageGallery';
import CarDetails from '../components/CarDetails';
import SellerInfo from '../components/SellerInfo.jsx';
import Navbar from '../components/Navbar.jsx';
import '../css/CarPage.css';

const CarPage = () => {
    const car = {
        name: "Mercedes-Benz GL",
        year: 2015,
        price: "99 500 PLN",
        mileage: "278 000 km",
        fuelType: "Benzyna",
        gearbox: "Automatyczna",
        bodyType: "SUV",
        engineSize: "2 996 cm3",
        horsepower: "333 KM",
        location: "Kraków, Stare Miasto",
        images: ["https://images.pexels.com/photos/29352555/pexels-photo-29352555/free-photo-of-audi-suv-in-scenic-desert-landscape-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=300", "https://images.pexels.com/photos/29352562/pexels-photo-29352562/free-photo-of-stylish-white-suv-in-desert-landscape.jpeg?auto=compress&cs=tinysrgb&w=300", "https://images.pexels.com/photos/29352559/pexels-photo-29352559/free-photo-of-luxury-suv-front-view-in-desert-road-scene.jpeg?auto=compress&cs=tinysrgb&w=300"], // Replace with actual image links
        seller: {
            name: "Piotr",
            type: "Osoba prywatna",
            membership: "Sprzedający na OTOMOTO od 2020",
            phoneNumber: '+48 123 456 789',
        },
    };

    return (
        <div className="car-page">
            <Navbar/>
            <div className="car-page-header">
                <h1>{car.name}</h1>
                <p>Używany • {car.year}</p>
                <p className="price">{car.price}</p>
            </div>
            <div className="car-page-body">
                <ImageGallery images={car.images} />
                <CarDetails car={car} />
                <SellerInfo seller={car.seller} location={car.location} />
            </div>
        </div>
    );
};

export default CarPage;
