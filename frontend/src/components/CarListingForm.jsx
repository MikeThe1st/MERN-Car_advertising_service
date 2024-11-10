import React, { useState } from 'react';
import { Form, Button, Col, Row, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/CarListingForm.css';


const CarListingForm = ({ onSubmit }) => {
    const [carData, setCarData] = useState({
        brand: '',
        model: '',
        year: '',
        mileage: '',
        color: '',
        fuelType: '',
        transmission: '',
        description: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setCarData((prevData) => ({
            ...prevData,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(carData);
        }
    };

    const handleClear = () => {
        setCarData({
            brand: '',
            model: '',
            year: '',
            mileage: '',
            color: '',
            fuelType: '',
            transmission: '',
            description: '',
            image: null,
        });
    };

    return (
        <Card className="car-listing-form-card shadow-sm p-4">
            <h3 className="text-center mb-4">Dodaj Nowe Ogłoszenie</h3>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="formBrand">
                            <Form.Label>Marka</Form.Label>
                            <Form.Control
                                type="text"
                                name="brand"
                                value={carData.brand}
                                onChange={handleChange}
                                placeholder="Marka"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="formModel">
                            <Form.Label>Model</Form.Label>
                            <Form.Control
                                type="text"
                                name="model"
                                value={carData.model}
                                onChange={handleChange}
                                placeholder="Model"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="formYear">
                            <Form.Label>Rok produkcji</Form.Label>
                            <Form.Control
                                type="number"
                                name="year"
                                value={carData.year}
                                onChange={handleChange}
                                placeholder="Rok"
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="formMileage">
                            <Form.Label>Przebieg (km)</Form.Label>
                            <Form.Control
                                type="number"
                                name="mileage"
                                value={carData.mileage}
                                onChange={handleChange}
                                placeholder="Przebieg"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="formColor">
                            <Form.Label>Kolor</Form.Label>
                            <Form.Control
                                type="text"
                                name="color"
                                value={carData.color}
                                onChange={handleChange}
                                placeholder="Kolor"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="formFuelType">
                            <Form.Label>Rodzaj paliwa</Form.Label>
                            <Form.Control
                                type="text"
                                name="fuelType"
                                value={carData.fuelType}
                                onChange={handleChange}
                                placeholder="Rodzaj paliwa"
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="formTransmission">
                            <Form.Label>Skrzynia biegów</Form.Label>
                            <Form.Control
                                type="text"
                                name="transmission"
                                value={carData.transmission}
                                onChange={handleChange}
                                placeholder="Skrzynia biegów"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={8}>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Opis</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={carData.description}
                                onChange={handleChange}
                                placeholder="Opisz samochód"
                                rows={3}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3" controlId="formImage">
                    <Form.Label>Zdjęcie samochodu</Form.Label>
                    <Form.Control
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                </Form.Group>

                <div className="text-center">
                    <Button variant="primary" type="submit" className="me-3">
                        Dodaj samochód
                    </Button>
                    <Button variant="secondary" type="button" onClick={handleClear}>
                        Anuluj
                    </Button>
                </div>
            </Form>
        </Card>
    );
};

export default CarListingForm;