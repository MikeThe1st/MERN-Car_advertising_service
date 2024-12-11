import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Accordion } from 'react-bootstrap';
import ProfilePicture from '../components/ProfilePicture';
import UserInfo from '../components/UserInfo';
import EditableProfileForm from '../components/EditableProfileForm';
import ListedCar from '../components/ListedCar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Profile.css';
import Navbar from '../components/Navbar';

import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null); // Initially, user is null
    const [cars, setCars] = useState([]); // Store cars added by user
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // For error handling

    // Fetch user data and cars added by the user
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch user info
                const response = await axios.get('http://localhost:3000/backend/user/info', { withCredentials: true });
                setUser(response.data); // Set user data

                // Fetch cars only after the user is fetched
                const carsResponse = await axios.get('http://localhost:3000/backend/cars/added-by', {
                    params: { addedBy: response.data.email }, // Using email as the addedBy parameter
                });
                setCars(carsResponse.data); // Set the fetched cars
            } catch (err) {
                console.error("Error fetching data:", err);
                setError('Failed to load data.');
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        fetchUserData(); // Call function to fetch user and cars data
    }, []); // Empty dependency array to only run on component mount

    // Show loading or error state
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const handleSave = (updatedData) => {
        setUser(updatedData);
        setIsEditing(false); // Turn off editing mode after saving
    };

    // Example statistics
    const statistics = {
        totalCars: cars.length,
        averagePrice: cars.reduce((total, car) => total + car.price, 0) / cars.length || 0, // Calculate average price
    };

    return (
        <div>
            <Navbar />
            <Container fluid className="profile-page p-5">
                <Col md={5} lg={4} className="profile-info-container">
                    <Card className="profile-card shadow-sm p-2">
                        <h5 className="text-center mb-4" style={{ whiteSpace: 'nowrap' }}>
                            Edycja profilu
                        </h5>
                        {/* Profile picture */}
                        <ProfilePicture
                            src={user?.profilePicture || 'https://via.placeholder.com/150'}
                            alt={`${user?.name}'s profile`}
                            className="profile-picture mb-4"
                        />
                        {/* User info */}
                        {/* <UserInfo user={user} /> */}
                        {/* Edit button */}
                        <Button
                            className="edit-button mt-3"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? 'Anuluj' : 'Edytuj Profil'}
                        </Button>
                        {/* Editable form for updating user info */}
                        {isEditing && (
                            <div className="editable-form-container mt-4">
                                <EditableProfileForm
                                    initialData={user}
                                    onSave={handleSave}
                                    className="editable-form expanded-edit-form"
                                />
                            </div>
                        )}
                    </Card>
                </Col>

                <Col md={7} lg={8} className="car-listings-container">
                    <Accordion>
                        {/* Car listings tab */}
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Moje Ogłoszenia</Accordion.Header>
                            <Accordion.Body>
                                {cars.length > 0 ? (
                                    cars.map((car) => (
                                        <ListedCar car={car} key={car._id} className="mb-4" />
                                    ))
                                ) : (
                                    <p>No cars listed by you yet.</p>
                                )}
                            </Accordion.Body>
                        </Accordion.Item>

                        {/* Statistics tab */}
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Statystyki</Accordion.Header>
                            <Accordion.Body>
                                <ul>
                                    <li>Liczba samochodów: {statistics.totalCars}</li>
                                    <li>Średnia cena samochodu: {statistics.averagePrice.toFixed(2)} PLN</li>
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
            </Container>
        </div>
    );
};

export default Profile;
