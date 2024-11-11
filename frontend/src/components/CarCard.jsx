import React from 'react';
import { Button, Card, Row, Col, Badge } from 'react-bootstrap';
import '../css/CarCard.css';

const CarCard = ({ car }) => {
    return (
        <Card className="car-card mb-3 p-3">
            <Row>
                <Col md={3}>
                    <img src={car.image} alt={car.name} className="car-image" />
                </Col>
                <Col md={6}>
                    <div className="car-info">
                        <h5>{car.name}</h5>
                        <p className="car-details">
                            <span>{car.engineSize} cm³ • {car.horsepower} KM • {car.features}</span><br />
                            <span>{car.location}</span><br />
                            <span>Podbite {car.timeAgo}</span><br />
                            <span>{car.sellerType}</span>
                        </p>
                        <Badge bg="primary" className="me-2">Wyróżnione</Badge>
                        <Badge bg="success">Zweryfikowane dane</Badge>
                    </div>
                </Col>
                <Col md={3} className="text-end">
                    <h4 className="car-price">{car.price} PLN</h4>
                    <a href="#" className="financing-link">Sprawdź możliwości finansowania</a>
                    <Button variant="primary" href={`/ogloszenie/${car.id}`}>Zobacz ogłoszenie</Button>
                </Col>
            </Row>
        </Card>
    );
};

export default CarCard;
