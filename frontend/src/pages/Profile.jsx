import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ProfilePicture from '../components/ProfilePicture';
import EditableProfileForm from '../components/EditableProfileForm';
import ListedCar from '../components/ListedCar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Profile.css';
import Navbar from '../components/Navbar';
import axios from 'axios';

const EditProfile = () => {
    const [user, setUser] = useState(null);
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/backend/user/info', { withCredentials: true });
                setUser(response.data);

                const carsResponse = await axios.get('http://localhost:3000/backend/cars/added-by', {
                    params: { addedBy: response.data.email },
                });
                setCars(carsResponse.data);
            } catch (err) {
                setError('Failed to load data.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const handleSave = (updatedData) => {
        setUser(updatedData);
    };

    const statistics = {
        totalCars: cars.length,
        averagePrice: cars.reduce((total, car) => total + car.price, 0) / cars.length || 0,
    };

    return (
        <div>
            <Navbar />
            <Container className="edit-profile-page mt-4">
                {/* Sekcja Edycji Profilu */}
                <Card className="profile-card mb-4 shadow-sm p-4">
                    <Row>
                        <Col md={4} className="text-center">
                            <ProfilePicture
                                src={user?.profilePicture || 'https://via.placeholder.com/150'}
                                alt={`${user?.name}'s profile`}
                                className="profile-picture"
                            />
                        </Col>
                        <Col md={8}>
                            <h4 className="mb-3">Edytuj Profil</h4>
                            <EditableProfileForm initialData={user} onSave={handleSave} />
                        </Col>
                    </Row>
                </Card>

                {/* Sekcja Wystawionych Samochodów */}
                <Card className="cars-card mb-4 shadow-sm p-4">
                    <h4 className="mb-3">Wystawione Samochody</h4>
                    <Row>
                        {cars.length > 0 ? (
                            cars.map((car) => (
                                <Col md={4} key={car._id} className="mb-4">
                                    <ListedCar car={car} />
                                </Col>
                            ))
                        ) : (
                            <p>Brak wystawionych samochodów.</p>
                        )}
                    </Row>
                </Card>

                {/* Sekcja Statystyk */}
                <Card className="stats-card shadow-sm p-4">
                    <h4 className="mb-3">Statystyki</h4>
                    <ul>
                        <li>Liczba samochodów: {statistics.totalCars}</li>
                        <li>Średnia cena samochodu: {statistics.averagePrice.toFixed(2)} PLN</li>
                    </ul>
                </Card>
            </Container>
        </div>
    );
};

export default EditProfile;
