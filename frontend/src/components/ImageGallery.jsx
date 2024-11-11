// src/components/ImageGallery.jsx
import React from 'react';
import '../css/CarPage.css';

const ImageGallery = ({ images }) => {
    return (
        <div className="image-gallery">
            {images.map((image, index) => (
                <img key={index} src={image} alt={`car-${index}`} className="gallery-image" />
            ))}
        </div>
    );
};

export default ImageGallery;
