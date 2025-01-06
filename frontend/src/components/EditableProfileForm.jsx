import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/EditableProfileForm.css";
import axios from 'axios';

const EditableProfileForm = ({ initialData, onSave }) => {
    const [formData, setFormData] = useState(initialData);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setValidationErrors({ ...validationErrors, [name]: null }); // Reset specific field error on change
    };

    const validate = () => {
        let isValid = true;
        const errors = {};

        if (!formData.email.includes("@")) {
            errors.email = "Email musi zawierać znak '@'.";
            isValid = false;
        }

        if (formData.phoneNumber.length < 9) {
            errors.phoneNumber = "Numer telefonu musi mieć co najmniej 9 znaków.";
            isValid = false;
        }

        setValidationErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

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
                        isInvalid={!!validationErrors.email}
                    />
                    {validationErrors.email && (
                        <Form.Text className="text-danger">{validationErrors.email}</Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Telefon</Form.Label>
                    <Form.Control
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        isInvalid={!!validationErrors.phoneNumber}
                    />
                    {validationErrors.phoneNumber && (
                        <Form.Text className="text-danger">{validationErrors.phoneNumber}</Form.Text>
                    )}
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? "Zapisuję..." : "Zapisz zmiany"}
                </Button>
            </Form>
        </div>
    );
};

export default EditableProfileForm;
