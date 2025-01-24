import React from 'react';
import { Card, Button } from 'react-bootstrap';
import '../css/ListedCar.css';

import axios from 'axios';

const ListedCar = ({ car }) => {
    const toggleCarStatus = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/backend/cars/status`, {
                carId: car._id,
                newStatus: !car.is_active,
            });

            if (response.status === 200) {
                alert(`Ogłoszenie zostało ${car.is_active ? 'usunięte' : 'przywrócone'}.`);
                window.location.reload();
            } else {
                console.error('Failed to update car status:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating car status:', error);
        }
    };

    const deleteCar = async () => {
        try {
            const confirmAction = window.confirm(
                'Czy na pewno chcesz trwale usunąć to ogłoszenie? Ta operacja jest nieodwracalna.'
            );

            if (!confirmAction) return;

            const response = await axios.post(`http://localhost:3000/backend/cars/mark-as-deleted`, {
                carId: car._id,
            });

            if (response.status === 200) {
                alert('Ogłoszenie zostało trwale usunięte.');
                window.location.reload(); // Reload to reflect changes
            } else {
                console.error('Failed to delete car:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    return (
        <Card className="listed-car-card shadow-sm">
            <Card.Img variant="top" src={`http://localhost:3000/public/${car?.imgPath}`} alt={car.name} />
            <Card.Body>
                <Card.Title>{car.brand} {car.model}</Card.Title>
                <Card.Text>Cena: {car.price} PLN</Card.Text>
                <Button className="m-2" variant="primary" href={`/CarPage?id=${car._id}`}>
                    Zobacz szczegóły
                </Button>
                <Button className="m-2" variant="primary" href={`/EditCarPage?id=${car._id}`}>
                    Edytuj
                </Button>
                <Button className="m-2" variant="secondary" onClick={toggleCarStatus}>
                    {car.is_active ? 'Usuń ogłoszenie' : 'Przywróć ogłoszenie'}
                </Button>
                <Button className="m-2" variant="danger" onClick={deleteCar}>
                    Usuń ogłoszenie
                </Button>
            </Card.Body>
        </Card>
    );
};

export default ListedCar;
