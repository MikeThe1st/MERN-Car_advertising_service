import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/GearboxCarsChart.css';

const GearboxCarsChart = () => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/backend/cars/get-cars');
                const cars = response.data;

                // Grupowanie aut według typu skrzyni biegów
                const carsByGearbox = cars.reduce((acc, car) => {
                    const gearbox = car.gearbox || 'Nieznana'; // Jeśli brak danych, ustaw "Nieznana"
                    acc[gearbox] = (acc[gearbox] || 0) + 1;
                    return acc;
                }, {});

                // Tworzenie danych do kafelków
                const formattedData = Object.entries(carsByGearbox).sort(([a], [b]) =>
                    a.localeCompare(b)
                );

                setChartData(formattedData);
            } catch (err) {
                console.error('Error fetching car data:', err);
                setError('Nie udało się załadować danych.');
            } finally {
                setLoading(false);
            }
        };

        fetchCarData();
    }, []);

    if (loading) return <p>Ładowanie danych...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="gearbox-cars-chart">
            <h3>Ilość samochodów według typu skrzyni biegów</h3>
            <div className="tiles-container">
                {chartData.map(([gearbox, count]) => (
                    <div className="tile" key={gearbox}>
                        <h4 className="tile-label">{gearbox}</h4>
                        <p className="tile-count">{count}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GearboxCarsChart;
