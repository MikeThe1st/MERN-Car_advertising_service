// src/components/ListedCar.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import '../css/ListedCar.css';

const ListedCar = ({ car }) => {
    return (
        <Card className="listed-car-card shadow-sm">
            <Card.Img variant="top" src={car.image} alt={car.name} className="listed-car-image" />
            <Card.Body>
                <Card.Title>{car.name}</Card.Title>
                <Card.Text>{car.description}</Card.Text>
                <Button variant="primary" href={`/cars/${car.id}`}>
                    Zobacz szczegóły
                </Button>
            </Card.Body>
        </Card>
    );
};

export default ListedCar;
