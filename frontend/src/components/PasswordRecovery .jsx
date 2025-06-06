import React, { useState } from 'react';
import axios from 'axios';
import '../css/PasswordRecovery.css';

const PasswordRecovery = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post('http://localhost:3000/backend/user/recover-password', {
                email,
            });
            setMessage(`Link do resetowania hasła został wysłany na adres email: ${email}`);
        } catch (err) {
            if (err.response) {
                if (err.response.status === 404) {
                    setError(err.response.data.msg || 'User not found.');
                } else {
                    setError('Failed to send the recovery email. Please try again.');
                }
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className="password-recovery">
            <h3>Odzyskiwanie hasła</h3>
            <form onSubmit={handleSubmit} className="recovery-form">
                <label htmlFor="email">Adres email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Wpisz swój adres email"
                    required
                />
                <button type="submit">Wyślij</button>
            </form>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default PasswordRecovery;
