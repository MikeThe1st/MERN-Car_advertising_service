import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar'; // Ensure the path is correct
import "../css/MainPage.css"; // Ensure the CSS path is correct

const MainPage = () => {
    const [cars, setCars] = useState([]);

    // Fetch cars from the backend
    const fetchCars = async () => {
        try {
            const response = await axios.get('http://localhost:3000/backend/cars/main-page');
            setCars(response.data); // Assuming the response contains an array of cars
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };

    // Fetch cars when the component mounts
    useEffect(() => {
        fetchCars();
    }, []);

    const handleSearch = (query) => {
        console.log("Search query:", query);
        // Add search logic here
    };

    return (
        <div className="container mt-4">
            <header className="text-center mb-4">
                <h1>AutoMarket</h1>
                <p>Najlepsze miejsce na zakup i sprzedaż samochodów</p>
            </header>

            {/* Search Bar */}
            <SearchBar onSearch={handleSearch} />

            {/* Section for popular cars */}
            <section className="mt-4">
                <h2>Najpopularniejsze samochody</h2>
                <div className="row">
                    {cars.length > 0 ? (
                        cars.map((car) => (
                            <div className="col-md-4" key={car._id}>
                                <div className="card mb-4">
                                    <img
                                        src={`http://localhost:3000/public/` + car.imgPath}
                                        className="card-img-top"
                                        alt={`${car.brand} ${car.model}`}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{`${car.brand} ${car.model}`}</h5>
                                        <p className="card-text">
                                            {`${car.productionYear} • ${car.horsePower} KM • ${car.fuel}`}
                                            <br />
                                            {`Cena: ${Number(car.price).toLocaleString('pl-PL')} PLN`}
                                        </p>
                                        <a href={`/CarPage?id=${car._id}`} className="btn btn-primary">
                                            Zobacz więcej
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">Ładowanie samochodów...</p>
                    )}
                </div>
            </section>

            <footer className="text-center mt-4">
                <p>© 2024 AutoMarket. Wszelkie prawa zastrzeżone.</p>
            </footer>
        </div>
    );
};

export default MainPage;
