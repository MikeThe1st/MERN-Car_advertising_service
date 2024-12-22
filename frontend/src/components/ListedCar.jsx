// src/components/ListedCar.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import '../css/ListedCar.css';

import axios from 'axios';

const ListedCar = ({ car }) => {
    const toggleCarStatus = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/backend/cars/status`, {
                carId: car._id,
                newStatus: !car.is_active,
            });

            if (response.status === 200) {
                alert(`Ogłoszenie zostało ${car.is_active ? 'usunięte' : 'przywrócone'}.`);
                window.location.reload()
            } else {
                console.error('Failed to update car status:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating car status:', error);
        }
    };
    return (
        <Card className="listed-car-card shadow-sm">
            <Card.Img variant="top" src={`http://localhost:3000/public/${car?.imgPath}`} alt={car.name} />
            <Card.Body>
                <Card.Title>{car.brand} {car.model}</Card.Title>
                <Card.Text>Cena: {car.price} PLN</Card.Text>
                <Button variant="primary" href={`/CarPage?id=${car._id}`}>
                    Zobacz szczegóły
                </Button>
                <Button variant="secondary" className="m-1" onClick={toggleCarStatus}>
                    {car.is_active ? 'Usuń ogłoszenie' : 'Przywróć ogłoszenie'}
                </Button>
            </Card.Body>
        </Card>
    );
};

export default ListedCar;