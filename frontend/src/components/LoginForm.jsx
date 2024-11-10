import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios'; // Ensure axios is imported
import { Link } from 'react-router-dom'; // Assuming you are using React Router
import "../css/Login.css";


const LoginForm = () => {
    const [failedLogins, setFailedLogins] = useState(0);
    const [ableToLogin, setAbleToLogin] = useState(true);

    useEffect(() => {
        if (failedLogins >= 3) {
            setAbleToLogin(false);
            const timeoutId = setTimeout(() => {
                setAbleToLogin(true);
            }, 10000);
            return () => clearTimeout(timeoutId);
        }
    }, [failedLogins]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!ableToLogin) return alert('You still cannot login! Wait a few seconds before trying again.');

        const formData = new FormData(e.target);
        const userData = {};
        formData.forEach((value, key) => {
            userData[key] = value;
        });

        try {
            const response = await axios.post('http://localhost:3000/backend/user/login', userData, { withCredentials: true });
            console.log('Response:', response);
            if (response.status === 200) {
                window.location.href = '/';
            } else {
                alert(response.data);
            }
        } catch (error) {
            console.error('Error:', error);
            setFailedLogins(failedLogins + 1);
            const message = error.response.data.msg;
            if (message) {
                alert(message);
            }
            if (failedLogins >= 3) {
                return alert(`You cannot login for the next 10 seconds, because of ${failedLogins + 1} failed attempts.`);
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Logowanie</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Hasło</label>
                        <input type="password" className="form-control" id="password" name="password" required />
                    </div>
                    <button type="submit" className="btn btn-primary">Zaloguj się</button>
                    <div className="form-footer">
                        <a href="#" className="text-secondary">Nie pamiętasz hasła?</a>
                    </div>
                </form>
                <div className="text-secondary">
                    <p>Nie masz konta? <Link to="/register">Zarejestruj się</Link></p>
                </div>
            </div>

            <div className="login-image"></div>
        </div>
    );
}

export default LoginForm;
