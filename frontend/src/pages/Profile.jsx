// src/pages/Profile.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import ProfilePicture from '../components/ProfilePicture ';
import UserInfo from '../components/UserInfo ';
import EditableProfileForm from '../components/EditableProfileForm ';
import ListedCar from '../components/ListedCar ';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Profile.css';

const Profile = () => {
    const [user, setUser] = useState({
        name: 'Jan Kowalski',
        email: 'jan.kowalski@example.com',
        phone: '+48 123 456 789',
        address: 'Warszawa, Polska',
        bio: 'Motoryzacyjny entuzjasta z ponad 10-letnim doświadczeniem w sprzedaży aut.',
        profilePicture: 'https://via.placeholder.com/150',
    });

    const [editing, setEditing] = useState(false);

    const [cars] = useState([
        {
            id: 1,
            name: 'Toyota Corolla 2021',
            description: 'Nowoczesny, ekonomiczny samochód z niskim przebiegiem.',
            image: 'https://via.placeholder.com/200',
        },
        {
            id: 2,
            name: 'Mazda CX-5 2020',
            description: 'SUV z przestronnym wnętrzem, idealny na rodzinne podróże.',
            image: 'https://via.placeholder.com/200',
        },
    ]);

    const handleSave = (updatedData) => {
        setUser(updatedData);
        setEditing(false);  // Wyłącz tryb edycji po zapisaniu
    };

    return (
        <Container fluid className="profile-page py-5">
            <Row>
                {/* Lewa strona profilu */}
                <Col md={5} lg={4} className="profile-info-container">
                    <Card className="profile-card shadow-sm p-4">
                        {/* Zdjęcie profilowe */}
                        <ProfilePicture 
                            src={user.profilePicture} 
                            alt={`${user.name}'s profile`} 
                            className="profile-picture mb-4"
                        />
                        {/* Informacje użytkownika */}
                        <UserInfo {...user} />
                        {/* Przycisk edycji */}
                        <Button 
                            className="edit-button mt-3" 
                            onClick={() => setEditing(!editing)}
                        >
                            {editing ? 'Anuluj' : 'Edytuj Profil'}
                        </Button>
                        {/* Formularz edycji poniżej informacji o użytkowniku */}
                        {editing && (
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

                {/* Prawa strona z listą samochodów */}
                <Col md={7} lg={8} className="car-listings-container">
                    {cars.map((car) => (
                        <ListedCar car={car} key={car.id} className="mb-4" />
                    ))}
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;