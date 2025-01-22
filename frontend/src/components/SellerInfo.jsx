import React, { useState } from 'react';
import axios from 'axios';
import '../css/CarPage.css';

const SellerInfo = ({ seller, location, loggedUser }) => {
    const [isMessageBoxVisible, setIsMessageBoxVisible] = useState(false);
    const [isPhoneNumberVisible, setIsPhoneNumberVisible] = useState(false);
    const [messageData, setMessageData] = useState({
        message: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMessageData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSendMessage = async () => {
        if (!loggedUser) {
            return alert('You must be logged in to send a message.');
        }

        try {
            // Send the message to the backend
            const response = await axios.post('http://localhost:3000/backend/chat/add-chat', {
                user1: loggedUser.email, // Sender's ID
                user2: seller.email, // Recipient's ID
                sender: loggedUser.email, // Sender of the message
                message: messageData.message, // The actual message content
            });

            if (response.status === 200) {
                alert('Message sent successfully!');
            } else {
                alert('Failed to send the message.');
            }
        } catch (err) {
            console.error('Error sending message:', err);
            alert('An error occurred while sending the message.');
        }

        // Clear the message box and hide the message form
        setMessageData({ message: '' });
        setIsMessageBoxVisible(false);
    };

    const handleShowPhoneNumber = () => {
        if (!loggedUser) {
            return alert('You must be logged in to view the phone number.');
        }
        setIsPhoneNumberVisible(true);
    };

    const handleDisplayMessage = () => {
        if (!loggedUser) {
            return alert('You must be logged in to send a message.');
        }
        setIsMessageBoxVisible(true);
    };

    return (
        <div className="seller-info">
            <h3>Sprzedawca: {seller.name}</h3>
            <p>{seller.sellerType || 'Osoba prywatna'}</p>
            <button
                className="contact-button m-1"
                onClick={handleDisplayMessage}
            >
                Napisz
            </button>
            <button
                className="phone-button m-1"
                onClick={handleShowPhoneNumber}
            >
                Wyświetl numer
            </button>
            {isPhoneNumberVisible && <p>Numer telefonu: {seller.phoneNumber}</p>}
            <p>Lokalizacja: {location}</p>

            {isMessageBoxVisible && (
                <div className="message-box">
                    <h4>Wyślij wiadomość</h4>
                    <textarea
                        name="message"
                        value={messageData.message}
                        onChange={handleInputChange}
                        placeholder="Wprowadź treść wiadomości"
                    />
                    <button onClick={handleSendMessage} className="send-button">
                        Wyślij wiadomość
                    </button>
                    <button
                        onClick={() => setIsMessageBoxVisible(false)}
                        className="close-button"
                    >
                        Zamknij
                    </button>
                </div>
            )}
        </div>
    );
};

export default SellerInfo;
