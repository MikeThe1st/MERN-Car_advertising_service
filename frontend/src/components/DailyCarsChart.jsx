import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../css/DailyCarsChart.css';

const DailyCarsChart = () => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const chartContainerRef = useRef(null);

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/backend/cars/get-cars');
                const cars = response.data;

                // Obliczamy dzisiejszą datę oraz dwa poprzednie dni
                const today = new Date();
                const twoDaysAgo = new Date(today);
                twoDaysAgo.setDate(today.getDate() - 2);

                // Funkcja do formatu YYYY-MM-DD
                const formatDate = (date) => date.toISOString().split('T')[0];

                // Filtrujemy samochody tylko z dzisiaj i dwóch poprzednich dni
                const filteredCars = cars.filter((car) => {
                    const carDate = new Date(car.createdAt);
                    return carDate >= twoDaysAgo && carDate <= today;
                });

                // Grupowanie aut według daty dodania
                const carsByDate = filteredCars.reduce((acc, car) => {
                    const date = formatDate(new Date(car.createdAt));
                    acc[date] = (acc[date] || 0) + 1;
                    return acc;
                }, {});

                // Tworzenie danych do wykresu
                const labels = Object.keys(carsByDate).sort(); // Posortowane daty
                const data = labels.map((date) => carsByDate[date]);

                setChartData({ labels, data });
            } catch (err) {
                console.error('Error fetching car data:', err);
                setError('Nie udało się załadować danych do wykresu.');
            } finally {
                setLoading(false);
            }
        };

        fetchCarData();
    }, []);

    if (loading) return <p>Ładowanie danych...</p>;
    if (error) return <p>{error}</p>;

    // Dynamika wykresu - dostosowanie skali wysokości słupków
    const maxValue = Math.max(...chartData.data, 6); // Ustawiamy minimum jako 6
    const chartContainerHeight = chartContainerRef.current?.offsetHeight || 400; // Wysokość kontenera wykresu
    const maxHeightForBars = chartContainerHeight * 0.6; // Maksymalna wysokość słupków (60% dostępnej przestrzeni)
    const chartHeightMultiplier = maxHeightForBars / maxValue; // Proporcjonalne dopasowanie wysokości słupków

    return (
        <div className="daily-cars-chart">
            <h3>Dodane auta w ciągu ostatnich 3 dni</h3>
            <div className="chart-container" ref={chartContainerRef}>
                {chartData.labels.map((label, index) => (
                    <div className="chart-bar" key={label}>
                        <div
                            className="bar"
                            style={{
                                height: `${chartData.data[index] * chartHeightMultiplier}px`,
                            }}
                            data-value={chartData.data[index]}
                        ></div>
                        <div className="label">{label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DailyCarsChart;