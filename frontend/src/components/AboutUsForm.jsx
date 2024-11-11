import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/AboutUsForm.css';
const AboutUsForm = () => {
    return (
        <Container fluid className="about-us-page py-5">
            <h2 className="text-center mb-4">O Nas</h2>
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="about-us-card shadow-sm p-4">
                        <h3 className="mb-3">Kim jesteśmy?</h3>
                        <p>
                            AutoMarket to dynamiczny zespół pasjonatów motoryzacji, który powstał, aby ułatwić zakup i sprzedaż samochodów na polskim rynku. Nasza platforma pozwala na szybkie i wygodne publikowanie ogłoszeń oraz wyszukiwanie idealnego auta.
                        </p>
                        <h3 className="mt-4 mb-3">Nasza Misja</h3>
                        <p>
                            Naszym celem jest dostarczanie intuicyjnych narzędzi, które pomagają naszym użytkownikom znaleźć samochód, który spełni ich oczekiwania. Dbamy o to, aby proces był przejrzysty, szybki i bezpieczny.
                        </p>
                        <h3 className="mt-4 mb-3">Dlaczego My?</h3>
                        <ul>
                            <li>Intuicyjna i łatwa w obsłudze platforma.</li>
                            <li>Duży wybór ofert samochodów z całej Polski.</li>
                            <li>Bezpieczeństwo i wiarygodność – weryfikujemy ogłoszenia.</li>
                            <li>Profesjonalne wsparcie klienta.</li>
                        </ul>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AboutUsForm;