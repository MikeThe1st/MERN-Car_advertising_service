import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#555' }}>
            <div className="container-fluid">
                {/* Logo and service name */}
                <a className="navbar-brand" href="#">AutoMarket</a>
                
                {/* Hamburger menu for mobile devices */}
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                {/* Navbar links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link active" href="#">Strona główna</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Kup samochód</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Sprzedaj samochód</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">O nas</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Kontakt</a>
                        </li>
                        {/* Action buttons */}
                        <li className="nav-item">
                            <a className="nav-link" href="profile.html">Profil</a>
                        </li>
                        <li className="nav-item">
                            <a className="btn btn-sell" href="sell.html" style={{ backgroundColor: '#707070', color: 'white', borderRadius: '30px', padding: '5px 15px' }}>
                                Wystaw auto
                            </a>
                        </li>
                        {/* Login button */}
                        <li className="nav-item">
                            <a className="btn btn-login" href="/Login" style={{ backgroundColor: '#007bff', color: 'white', borderRadius: '30px', padding: '5px 15px', marginLeft: '10px' }}>
                                Zaloguj się
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
