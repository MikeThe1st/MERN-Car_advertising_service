// src/components/SellerInfo.jsx
import React from 'react';
import '../css/CarPage.css';

const SellerInfo = ({ seller, location }) => {
    return (
        <div className="seller-info">
            <h3>{seller.name}</h3>
            <p>{seller.type}</p>
            <p>{seller.membership}</p>
            <button className="contact-button">Napisz</button>
            <button className="phone-button">Wyświetl numer</button>
            <p>{location}</p>
        </div>
    );
};

export default SellerInfo;
