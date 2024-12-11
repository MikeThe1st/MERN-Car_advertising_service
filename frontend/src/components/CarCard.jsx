import React from 'react';
import { Button, Card, Row, Col, Badge } from 'react-bootstrap';
import '../css/CarCard.css';


const CarCard = ({ car }) => {

    return (
        <Card className="car-card mb-3 p-3">
            <Row>
                <Col md={3}>
                    <img
                        src={`http://localhost:3000/public/` + car?.imgPath}
                        alt={`${car?.brand} ${car?.model}`}
                        className="car-image"
                    />
                </Col>
                <Col md={6}>
                    <div className="car-info">
                        <h5>{`${car?.brand} ${car?.model}`}</h5>
                        <p className="car-details">
                            <span>{`${car?.productionYear} • ${car?.horsePower} KM • ${car.fuel}`}</span><br />
                            <span>{`${car?.mileage} km • ${car?.color}`}</span><br />
                            <span>{car?.location}</span><br />
                            <span>{car?.sellerType}</span>
                        </p>
                        {car.is_damaged && <Badge bg="danger">Uszkodzony</Badge>}
                        <Badge bg="success">{car?.views} Wyświetleń</Badge>
                    </div>
                </Col>
                <Col md={3} className="text-end">
                    <h4 className="car-price">{`${Number(car?.price).toLocaleString('pl-PL')} PLN`}</h4>

                    <a href="#" className="financing-link">Sprawdź możliwości finansowania</a>
                    <Button variant="primary" href={`/CarPage?id=${car?._id}`}>Zobacz ogłoszenie</Button>
                </Col>
            </Row>
        </Card>
    );
};

export default CarCard;
