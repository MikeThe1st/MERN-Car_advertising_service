import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/EditableProfileForm.css";
import axios from 'axios';

const EditableProfileForm = ({ initialData, onSave }) => {
    const [formData, setFormData] = useState(initialData);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Send updated data to backend (POST request)
            const response = await axios.post('http://localhost:3000/backend/user/update-profile', formData, { withCredentials: true });
            setLoading(false);
            // Call the onSave function to refresh parent component if needed
            onSave(response.data);
            alert("Dane zostały zaktualizowane.");
            window.location.reload();
        } catch (err) {
            setLoading(false);
            console.error("Błąd podczas aktualizacji danych użytkownika:", err);
            setError("Nie udało się zaktualizować danych użytkownika.");
        }
    };

    return (
        <div>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Imię</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Telefon</Form.Label>
                    <Form.Control
                        type="text"
                        name="phoneNumber"  // Use "phoneNumber" to match the state property
                        value={formData.phoneNumber} // Bind it to the correct property in the state
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? "Zapisuję..." : "Zapisz zmiany"}
                </Button>
            </Form>
        </div>
    );
}

export default EditableProfileForm;
