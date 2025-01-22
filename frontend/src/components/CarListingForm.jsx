import React, { useState, useEffect } from 'react';
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
        gearbox: '',
        location: '',
        description: '',
        horsePower: '',
        price: '',
        is_damaged: false,
        image: null,
        addedBy: email,
    });

    const [brandModels, setBrandModels] = useState({});
    const [errors, setErrors] = useState({});
    
    useEffect(() => {
        const fetchBrandModels = async () => {
            try {
                const response = await axios.get('http://localhost:3000/backend/cars/brands-and-models'); // Replace with your endpoint
                const formattedData = response.data.reduce((acc, item) => {
                    acc[item.brand] = item.models;
                    return acc;
                }, {});
                setBrandModels(formattedData); // Set the state with formatted data
            } catch (error) {
                console.error('Error fetching brand-model data:', error);
            }
        };

        fetchBrandModels();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === 'brand') {
            setCarData((prevData) => ({
                ...prevData,
                model: '', // Reset model if brand changes
            }));
        }
    };

    const handleToggleChange = (e) => {
        const { checked } = e.target;
        setCarData((prevData) => ({
            ...prevData,
            is_damaged: checked,
        }));
    };

    const handleImageChange = (e) => {
        setCarData((prevData) => ({
            ...prevData,
            image: e.target.files[0],
        }));
    };

    const validateFields = () => {
        const newErrors = {};

        if (!carData.productionYear || carData.productionYear < 1885 ) {
            newErrors.productionYear = "Rok produkcji musi być większy niż 1885.";
        }

        if (!carData.mileage || carData.mileage < 0) {
            newErrors.mileage = "Przebieg nie może być ujemny.";
        }

        if (!carData.horsePower || carData.horsePower < 0) {
            newErrors.horsePower = "Moc silnika nie może być ujemna.";
        }

        if (!carData.price || carData.price < 0) {
            newErrors.price = "Cena nie może być ujemna.";
        }

        if (!carData.color) {
            newErrors.color = "Kolor jest wymagany.";
        }

        if (!carData.fuel) {
            newErrors.fuel = "Rodzaj paliwa jest wymagany.";
        }

        if (!carData.gearbox) {
            newErrors.gearbox = "Skrzynia biegów jest wymagana.";
        }

        if (!carData.location) {
            newErrors.location = "Lokalizacja jest wymagana.";
        }

        if (!carData.description) {
            newErrors.description = "Opis jest wymagany.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateFields()) {
            return;
        }

        const formData = new FormData();
        for (let key in carData) {
            formData.append(key, carData[key]);
        }

        try {
            const response = await axios.post('http://localhost:3000/backend/cars/add-new', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                alert("Dodano ogłoszenie.");
                window.location.href = '/profile';
            } else {
                console.error('Failed to add car');
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
            gearbox: '',
            location: '',
            description: '',
            horsePower: '',
            price: '',
            is_damaged: false,
            image: null,
        });
        setErrors({});
    };

    return (
        <Card className="car-listing-form-card shadow-sm p-4">
            <h3 className="text-center mb-4">Dodaj Nowe Ogłoszenie</h3>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="formBrand">
                            <Form.Label>Marka</Form.Label>
                            <Form.Select
                                name="brand"
                                value={carData.brand}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Wybierz markę</option>
                                {Object.keys(brandModels).map((brand) => (
                                    <option key={brand} value={brand}>
                                        {brand}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="formModel">
                            <Form.Label>Model</Form.Label>
                            <Form.Select
                                name="model"
                                value={carData.model}
                                onChange={handleChange}
                                required
                                disabled={!carData.brand}
                            >
                                <option value="">Wybierz model</option>
                                {carData.brand &&
                                    brandModels[carData.brand].map((model) => (
                                        <option key={model} value={model}>
                                            {model}
                                        </option>
                                    ))}
                            </Form.Select>
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
                                isInvalid={!!errors.productionYear}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.productionYear}
                            </Form.Control.Feedback>
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
                                isInvalid={!!errors.mileage}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.mileage}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="formHorsePower">
                            <Form.Label>Moc silnika (KM)</Form.Label>
                            <Form.Control
                                type="number"
                                name="horsePower"
                                value={carData.horsePower}
                                onChange={handleChange}
                                placeholder="KM"
                                required
                                isInvalid={!!errors.horsePower}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.horsePower}
                            </Form.Control.Feedback>
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
                                isInvalid={!!errors.price}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.price}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
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
                                isInvalid={!!errors.color}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.color}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="formFuel">
                            <Form.Label>Paliwo</Form.Label>
                            <Form.Select
                                name="fuel"
                                value={carData.fuel}
                                onChange={handleChange}
                                required
                                isInvalid={!!errors.fuel}
                            >
                                <option value="">Wybierz rodzaj paliwa</option>
                                <option value="Petrol">Benzyna</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Electric">Elektryczny</option>
                                <option value="Hybrid">Hybrida</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.fuel}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="formGearbox">
                            <Form.Label>Skrzynia biegów</Form.Label>
                            <Form.Select
                                name="gearbox"
                                value={carData.gearbox}
                                onChange={handleChange}
                                required
                                isInvalid={!!errors.gearbox}
                            >
                                <option value="">Wybierz skrzynię biegów</option>
                                <option value="Manual">Manualna</option>
                                <option value="Automatic">Automatyczna</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.gearbox}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="formLocation">
                            <Form.Label>Lokalizacja</Form.Label>
                            <Form.Control
                                type="text"
                                name="location"
                                value={carData.location}
                                onChange={handleChange}
                                placeholder="Lokalizacja"
                                required
                                isInvalid={!!errors.location}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.location}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formImage">
                            <Form.Label>Zdjęcie pojazdu</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={12}>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Opis</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={carData.description}
                                onChange={handleChange}
                                placeholder="Dodaj opis samochodu"
                                rows={4}
                                required
                                isInvalid={!!errors.description}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.description}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="formIsDamaged">
                            <Form.Check
                                type="checkbox"
                                name="is_damaged"
                                label="Pojazd uszkodzony"
                                checked={carData.is_damaged}
                                onChange={handleToggleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col className="text-center">
                        <Button type="submit" variant="primary" className="me-2">
                            Dodaj ogłoszenie
                        </Button>
                        <Button type="button" variant="secondary" onClick={handleClear}>
                            Wyczyść
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};

export default CarListingForm;
