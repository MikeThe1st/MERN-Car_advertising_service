import React from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios'; // Ensure axios is imported
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfilePicture = ({ src, alt }) => (
    <div className="text-center mb-3">
        <img
            src={src}
            alt={alt}
            className="rounded-circle img-thumbnail"
            width="150"
            height="150"
        />
    </div>
);

export default ProfilePicture;
