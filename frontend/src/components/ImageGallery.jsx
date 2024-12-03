// src/components/ImageGallery.jsx
import React from 'react';
import '../css/CarPage.css';


const ImageGallery = ({ images }) => {
    return (
        <div className="image-gallery">
            {images.map((image, index) => (
                <img key={index} src={image} alt={`Zdjęcie auta ${index + 1}`} />
            ))}
        </div>
    );
};

export default ImageGallery;