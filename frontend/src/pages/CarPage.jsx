// src/pages/CarPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ImageGallery from '../components/ImageGallery';
import CarDetails from '../components/CarDetails';
import SellerInfo from '../components/SellerInfo.jsx';
import Navbar from '../components/Navbar.jsx';
import '../css/CarPage.css';

const CarPage = () => {
    const location = useLocation(); // Access the full URL location
    const [car, setCar] = useState(null); // State to store the car data
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling
    const [seller, setSeller] = useState(null)

    // Extract the `id` from the query parameters
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/backend/user/get-user",
                    { withCredentials: true }
                );
                setUser(response.data[0]);
                console.log(response.data[0])
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="));

        if (token) {
            getUser();
        } else {
            console.log("No token found.");
        }
    }, []);

    useEffect(() => {
        const timeout = setTimeout(async () => {
            if (!id) {
                setError('No car ID provided.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:3000/backend/cars/car/${id}`);
                setCar(response.data.updatedCar);
                setSeller(response.data.seller[0])
            } catch (err) {
                console.error('Error fetching car:', err);
                setError('Failed to load car data.');
            } finally {
                setLoading(false);
            }
        }, 300); // Delay of 300ms

        return () => clearTimeout(timeout); // Clear timeout if component unmounts
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="car-page">
            <Navbar />
            <div className="text-center my-4 car-img">
                <img
                    src={`http://localhost:3000/public/${car.imgPath}`}
                    alt={`${car.brand} ${car.model}`}
                    className="img-fluid rounded shadow"
                />
            </div>
            {/* Uncomment this if you use an image gallery */}
            {/* <div className="car-page-gallery">
                <ImageGallery images={car.imgPath} />
            </div> */}
            <div className="car-page-details">
                <h1>{`${car.brand} ${car.model}`}</h1>
                <p>Używany • {car.productionYear}</p>
                {/* <p className="price">{`${car.price.toLocaleString('pl-PL')} PLN`}</p> */}
                <CarDetails car={car} />
                <SellerInfo seller={seller} location={car.location || "(Brak)"} loggedUser={user} />
                {/* <SellerInfo seller={{ name: car.addedBy, type: user?.sellerType | "Undefined" }} location={car.location} /> */}
            </div>
            <div className="car-page-description">
                <h2>Opis</h2>
                <p>{car.description}</p>
            </div>
        </div>
    );
};

export default CarPage;
