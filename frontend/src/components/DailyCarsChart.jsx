import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../css/DailyCarsChart.css';

const DailyCarsChart = () => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const chartContainerRef = useRef(null);

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/backend/cars/get-cars');
                const cars = response.data;

                setChartData(cars);
            } catch (err) {
                console.error('Error fetching car data:', err);
                setError('Nie udało się załadować danych.');
            } finally {
                setLoading(false);
            }
        };

        fetchCarData();
    }, []);

    const handleFilter = () => {
        if (!startDate || !endDate) {
            setError('Proszę wybrać zakres dat.');
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59); // Uwzględnij cały dzień końcowy

        // Filtrujemy samochody według zakresu dat
        const filteredCars = chartData.filter((car) => {
            const carDate = new Date(car.createdAt);
            return carDate >= start && carDate <= end;
        });

        // Grupowanie aut według daty dodania
        const carsByDate = filteredCars.reduce((acc, car) => {
            const date = car.createdAt.split('T')[0]; // Formatujemy datę jako YYYY-MM-DD
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});

        // Tworzenie danych do wykresu
        const labels = Object.keys(carsByDate).sort();
        const data = labels.map((date) => carsByDate[date]);

        setChartData({ labels, data });
        setError(null);
    };

    if (loading) return <p>Ładowanie danych...</p>;
    if (error) return <p>{error}</p>;

    // Dynamika wykresu - dostosowanie skali wysokości słupków
    const maxValue = Math.max(...(chartData.data || []), 6); // Ustawiamy minimum jako 6
    const chartContainerHeight = chartContainerRef.current?.offsetHeight || 400; // Wysokość kontenera wykresu
    const maxHeightForBars = chartContainerHeight * 0.6; // Maksymalna wysokość słupków (60% dostępnej przestrzeni)
    const chartHeightMultiplier = maxHeightForBars / maxValue; // Proporcjonalne dopasowanie wysokości słupków

    return (
        <div className="daily-cars-chart">
            <h3>Dodane auta w wybranym okresie</h3>
            <div className="date-filters">
                <label>
                    Od:
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </label>
                <label>
                    Do:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </label>
                <button onClick={handleFilter}>Filtruj</button>
            </div>
            <div className="chart-container" ref={chartContainerRef}>
                {chartData.labels?.map((label, index) => (
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
