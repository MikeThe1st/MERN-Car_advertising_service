import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../css/YearlyCarsChart.css';

const YearlyCarsChart = () => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const chartContainerRef = useRef(null);

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/backend/cars/get-cars');
                const cars = response.data;

                // Grupowanie aut według rocznika
                const carsByYear = cars.reduce((acc, car) => {
                    const year = car.year || 'Nieznany'; // Jeśli brak danych, ustaw "Nieznany"
                    acc[year] = (acc[year] || 0) + 1;
                    return acc;
                }, {});

                // Tworzenie danych do wykresu
                const labels = Object.keys(carsByYear).sort(); // Posortowane roczniki
                const data = labels.map((year) => carsByYear[year]);

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
        <div className="yearly-cars-chart">
            <h3>Ilość samochodów według rocznika</h3>
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

export default YearlyCarsChart;
