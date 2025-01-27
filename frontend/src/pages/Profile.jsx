import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import ProfilePicture from '../components/ProfilePicture';
import EditableProfileForm from '../components/EditableProfileForm';
import ListedCar from '../components/ListedCar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Profile.css';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EditProfile = () => {
    const [user, setUser] = useState(null);
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for password update
    const [passwordData, setPasswordData] = useState({
        prevPassword: '',
        newPassword: '',
        repeatPassword: '',
    });
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/backend/user/get-user', { withCredentials: true });
                setUser(response.data[0]);

                const carsResponse = await axios.get('http://localhost:3000/backend/cars/added-by', {
                    params: { addedBy: response.data[0].email },
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

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');

        if (passwordData.newPassword !== passwordData.repeatPassword) {
            setPasswordError('New passwords do not match.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/backend/user/update-password', {
                email: user.email,
                prevPassword: passwordData.prevPassword,
                newPassword: passwordData.newPassword,
                repeatPassword: passwordData.repeatPassword,
            });

            if (response.status === 200) {
                setPasswordSuccess('Password updated successfully.');
                setPasswordData({
                    prevPassword: '',
                    newPassword: '',
                    repeatPassword: '',
                });
            }
        } catch (error) {
            setPasswordError(error.response?.data?.msg || 'Failed to update password.');
        }
    };

    return (
        <div>
            <Navbar />
            <Container className="edit-profile-page mt-4">
                {/* Profile Editing Section */}
                <Card className="profile-card mb-4 shadow-sm p-4">
                    <Row>
                        <Col md={4} className="text-center">
                            <ProfilePicture
                                src={user?.profilePicture || 'https://placehold.jp/150x150.png'}
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

                {/* Password Update Section */}
                <Card className="password-update-card shadow-sm p-4">
                    <h4 className="mb-3">Zmień Hasło</h4>
                    <Form onSubmit={handlePasswordSubmit}>
                        <Form.Group className="mb-3" controlId="prevPassword">
                            <Form.Label>Aktualne Hasło</Form.Label>
                            <Form.Control
                                type="password"
                                name="prevPassword"
                                value={passwordData.prevPassword}
                                onChange={handlePasswordChange}
                                placeholder="Wprowadź aktualne hasło"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="newPassword">
                            <Form.Label>Nowe Hasło</Form.Label>
                            <Form.Control
                                type="password"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                placeholder="Wprowadź nowe hasło"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="repeatPassword">
                            <Form.Label>Powtórz Nowe Hasło</Form.Label>
                            <Form.Control
                                type="password"
                                name="repeatPassword"
                                value={passwordData.repeatPassword}
                                onChange={handlePasswordChange}
                                placeholder="Powtórz nowe hasło"
                                required
                            />
                        </Form.Group>
                        {passwordError && <p className="text-danger">{passwordError}</p>}
                        {passwordSuccess && <p className="text-success">{passwordSuccess}</p>}
                        <Button variant="primary" type="submit">
                            Zmień Hasło
                        </Button>
                    </Form>
                </Card>

                <div className="text-center mt-4">
                    <h2>Skrzynka pocztowa</h2>
                    <Link to="/MessPage">
                        <Button variant="success">Sprawdź wiadomości</Button>
                    </Link>
                </div>


                {/* Listed Cars Section */}
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

                {/* Statistics Section */}
                <Card className="stats-card mb-4 shadow-sm p-4">
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
