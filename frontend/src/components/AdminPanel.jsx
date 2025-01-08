import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import '../css/AdminPanel.css';

const AdminPanel = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:3000/backend/cars/admin');
                setCars(response.data);
            } catch (err) {
                console.error("Error fetching car data:", err);
                setError("Failed to load cars. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    const handleToggleStatus = async (carId, isActive) => {
        try {
            await axios.post('http://localhost:3000/backend/cars/status', {
                carId,
                newStatus: !isActive,
            });
            alert(`Car has been ${isActive ? 'deactivated' : 'reactivated'}.`);
            setCars((prevCars) =>
                prevCars.map((car) =>
                    car._id === carId ? { ...car, is_active: !isActive } : car
                )
            );
        } catch (err) {
            console.error('Error toggling car status:', err);
            alert('Failed to update car status.');
        }
    };

    if (loading) return <div className="loading">Loading cars...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="admin-panel">
            <h1 className="admin-panel-title">Admin Panel</h1>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Marka</th>
                        <th>Model</th>
                        <th>Cena</th>
                        <th>Status</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car, index) => (
                        <tr key={car._id}>
                            <td>{index + 1}</td>
                            <td>{car.brand}</td>
                            <td>{car.model}</td>
                            <td>{car.price} PLN</td>
                            <td>{car.is_active ? 'Active' : 'Inactive'}</td>
                            <td>
                                <Button
                                    variant={car.is_active ? 'danger' : 'success'}
                                    onClick={() => handleToggleStatus(car._id, car.is_active)}
                                >
                                    {car.is_active ? 'Dezaktywuj' : 'Aktywuj'}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default AdminPanel;
