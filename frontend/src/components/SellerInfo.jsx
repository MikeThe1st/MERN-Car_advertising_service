import React, { useState } from 'react';
import '../css/CarPage.css';

const SellerInfo = ({ seller, location, loggedUser }) => {
    const [isMessageBoxVisible, setIsMessageBoxVisible] = useState(false);
    const [isPhoneNumberVisible, setIsPhoneNumberVisible] = useState(false);  // Stan do przechowywania widoczności numeru telefonu
    const [messageData, setMessageData] = useState({
        sender: '',
        subject: '',
        message: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMessageData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSendMessage = () => {
        setMessageData((prevData) => ({
            ...prevData,
            sender: loggedUser._id,
        }))
        console.log('Wiadomość wysłana:', messageData);
        setIsMessageBoxVisible(false); // Zamknięcie okna po wysłaniu wiadomości
    };

    const handleShowPhoneNumber = () => {
        if (!loggedUser) {
            return alert('Zaloguj się, aby wyświetlić numer sprzedawcy!')
        }
        setIsPhoneNumberVisible(true);  // Pokazanie numeru telefonu
    };

    const handleDisplayMessage = () => {
        if (!loggedUser) {
            return alert('Zaloguj się, aby wysłać wiadomość!')
        }
        setIsMessageBoxVisible(true)
    }

    return (
        <div className="seller-info">
            <h3>Sprzedawca: {seller.name}</h3>
            <p>{seller.sellerType || "Osoba prywatna"}</p>
            {/* <p>{seller.membership}</p> */}
            <button
                className="contact-button m-1"
                onClick={handleDisplayMessage} // Pokazanie okna do wysyłania wiadomości
            >
                Napisz
            </button>
            <button
                className="phone-button m-1"
                onClick={handleShowPhoneNumber}  // Funkcja wyświetlająca numer telefonu
            >
                Wyświetl numer
            </button>
            {isPhoneNumberVisible && <p>Numer telefonu: {seller.phoneNumber}</p>} {/* Wyświetlanie numeru telefonu */}
            <p>Lokalizacja: {location}</p>

            {/* Okno wiadomości */}
            {isMessageBoxVisible && (
                <div className="message-box">
                    <h4>Wyślij wiadomość</h4>
                    <label>Temat:</label>
                    <input
                        type="text"
                        name="subject"
                        value={messageData.subject}
                        onChange={handleInputChange}
                        placeholder="Wprowadź temat"
                    />
                    <label>Wiadomość:</label>
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
                        onClick={() => setIsMessageBoxVisible(false)} // Zamknięcie okna
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
