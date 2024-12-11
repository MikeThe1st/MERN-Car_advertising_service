// src/components/ListedCar.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import '../css/ListedCar.css';

const ListedCar = ({ car }) => {
    return (
        <Card className="listed-car-card shadow-sm">
            <Card.Img variant="top" src={`http://localhost:3000/public/` + car?.imgPath} alt={car.name} className="listed-car-image" />
            <Card.Body>
                <Card.Title>{car.brand}</Card.Title>
                <Card.Title>{car.model}</Card.Title>
                <Card.Title>{car.price} PLN</Card.Title>
                <Card.Text>{car.description}</Card.Text>
                <Button variant="primary" href={`/CarPage?id=${car._id}`}>
                    Zobacz szczegóły
                </Button>
            </Card.Body>
        </Card>
    );
};

export default ListedCar;
