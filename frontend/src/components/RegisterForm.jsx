import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../css/Register.css";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        phoneNumber: '',
        sellerType: 'Osoba prywatna', // Default value
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            return setError('Hasła muszą się zgadzać.');
        }

        try {
            const response = await axios.post('http://localhost:3000/backend/user/register', {
                name: formData.firstName,
                email: formData.email,
                password: formData.password,
                phoneNumber: formData.phoneNumber,
                sellerType: formData.sellerType,
            }, {
                withCredentials: true,
            });
            console.log('Response:', response);
            if (response.status === 200) {
                alert("Utworzono konto, możesz się zalogować.")
                window.location.href = '/login'; // Redirect after successful registration
            } else {
                alert(response.data);
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error.response?.data?.msg || 'Wystąpił błąd podczas rejestracji.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Rejestracja</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">Imię</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Hasło</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Potwierdź Hasło</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label">Numer Telefonu</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="sellerType" className="form-label">Typ Sprzedawcy</label>
                        <select
                            className="form-select"
                            id="sellerType"
                            name="sellerType"
                            value={formData.sellerType}
                            onChange={handleChange}
                            required
                        >
                            <option value="Osoba prywatna">Osoba prywatna</option>
                            <option value="Komis samochodowy">Komis samochodowy</option>
                        </select>
                    </div>

                    {error && <p className="text-danger">{error}</p>}

                    <button type="submit" className="btn btn-primary">Zarejestruj się</button>
                    <div className="form-footer">
                        <a href="#" className="text-secondary">Nie pamiętasz hasła?</a>
                    </div>
                </form>
                <div className="text-secondary">
                    <p>Masz już konto? <Link to="/login">Zaloguj się</Link></p>
                </div>
            </div>

            <div className="Register-image"></div>
        </div>
    );
};

export default RegisterForm;
