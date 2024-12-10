import React, { useState } from 'react';
import { Form, Button, Col, Row, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/CarListingForm.css';
import axios from 'axios';

const CarListingForm = ({ email }) => {
    const [carData, setCarData] = useState({
        brand: '',
        model: '',
        productionYear: '',
        mileage: '',
        color: '',
        fuel: '',
        transmission: '',
        description: '',
        horsePower: '',
        price: '',
        is_damaged: false,
        image: null,
        addedBy: email
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleToggleChange = (e) => {
        const { checked } = e.target;
        setCarData((prevData) => ({
            ...prevData,
            is_damaged: checked,
        }));
    };

    const handleImageChange = (e) => {
        console.log(e.target.files);
        setCarData((prevData) => ({
            ...prevData,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (let key in carData) {
            formData.append(key, carData[key]);
        }

        try {
            const response = await axios.post('http://localhost:3000/backend/cars/add-new', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Important for file uploads
                },
            });

            if (response.status === 201) {
                console.log('Car added successfully', response.data);
                alert("Dodano ogłoszenie.")
                window.location.href = '/profile'
            } else {
                console.log('Failed to add car');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleClear = () => {
        setCarData({
            brand: '',
            model: '',
            productionYear: '',
            mileage: '',
            color: '',
            fuel: '',
            transmission: '',
            description: '',
            horsePower: '',
            price: '',
            is_damaged: false,
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
                        <Form.Group controlId="formProductionYear">
                            <Form.Label>Rok produkcji</Form.Label>
                            <Form.Control
                                type="number"
                                name="productionYear"
                                value={carData.productionYear}
                                onChange={handleChange}
                                placeholder="Rok"
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="formHorsePower">
                            <Form.Label>Moc silnika (KM)</Form.Label>
                            <Form.Control
                                type="number"
                                name="horsePower"
                                value={carData.horsePower}
                                onChange={handleChange}
                                placeholder="Moc"
                                required
                            />
                        </Form.Group>
                    </Col>
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
                            <Form.Select
                                name="color"
                                value={carData.color}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Wybierz kolor</option>
                                <option value="Czarny">Czarny</option>
                                <option value="Biały">Biały</option>
                                <option value="Niebieski">Niebieski</option>
                                <option value="Zielony">Zielony</option>
                                <option value="Żółty">Żółty</option>
                                <option value="Czerwony">Czerwony</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="formFuel">
                            <Form.Label>Rodzaj paliwa</Form.Label>
                            <Form.Select
                                name="fuel"
                                value={carData.fuel}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Wybierz rodzaj paliwa</option>
                                <option value="Benzyna">Benzyna</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Hybryda">Hybryda</option>
                                <option value="Elektryczny">Elektryczny</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="formPrice">
                            <Form.Label>Cena (PLN)</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={carData.price}
                                onChange={handleChange}
                                placeholder="Cena"
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

                {/* Add is_damaged toggle */}
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="formIsDamaged">
                            <Form.Label>Czy uszkodzony?</Form.Label>
                            <Form.Check
                                type="checkbox"
                                name="is_damaged"
                                checked={carData.is_damaged}
                                onChange={handleToggleChange}
                                label="Uszkodzony"
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
                        accept=".png, .jpg, .jpeg"
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
