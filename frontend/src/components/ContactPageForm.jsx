import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/ContactPageForm.css';

const ContactPageForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Wysłano dane formularza:", formData);
        // Można tutaj dodać wysyłanie danych formularza do serwera lub innej obsługi
        setFormData({ name: '', email: '', subject: '', message: '' }); // Czyszczenie formularza po wysłaniu
    };

    return (
        <div className="contact-page-container">
            <Card className="contact-form-card shadow-sm p-4">
                <h3 className="text-center mb-4">Skontaktuj się z nami</h3>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formName">
                                <Form.Label>Imię i nazwisko</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Twoje imię i nazwisko"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Twój email"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="formSubject">
                        <Form.Label>Temat</Form.Label>
                        <Form.Control
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Temat wiadomości"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formMessage">
                        <Form.Label>Wiadomość</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Twoja wiadomość"
                            rows={5}
                            required
                        />
                    </Form.Group>

                    <div className="text-center">
                        <Button variant="primary" type="submit">
                            Wyślij wiadomość
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default ContactPageForm;
