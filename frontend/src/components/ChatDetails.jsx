import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatDetails = ({ chat, onReplySent }) => {
    const [messages, setMessages] = useState([]);
    const [reply, setReply] = useState('');

    // Funkcja do pobrania pełnej historii czatu
    const fetchChatHistory = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/backend/chat/${chat.id}`);
            setMessages(response.data.messages); // Zakładamy, że backend zwraca tablicę wiadomości
        } catch (error) {
            console.error('Błąd podczas pobierania wiadomości:', error);
        }
    };

    // Pobieranie wiadomości po wybraniu czatu
    useEffect(() => {
        if (chat) {
            fetchChatHistory();
        }
    }, [chat]);

    const handleSendReply = async () => {
        try {
            // Wysłanie wiadomości do backendu
            await axios.post(`http://localhost:3000/backend/chat/${chat.id}/send`, {
                message: reply,
            });

            // Dodanie nowej wiadomości do lokalnej listy
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'You', content: reply, timestamp: new Date().toISOString() },
            ]);
            setReply(''); // Wyczyszczenie pola
            onReplySent(); // Wywołanie akcji w komponencie nadrzędnym (opcjonalne)
        } catch (error) {
            console.error('Błąd podczas wysyłania wiadomości:', error);
        }
    };

    return (
        <div>
            <h3 style={{ marginBottom: '20px', color: '#333' }}>Rozmowa z {chat.name}</h3>
            <div
                style={{
                    maxHeight: '400px',
                    overflowY: 'auto',
                    marginBottom: '20px',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                }}
            >
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            style={{
                                marginBottom: '10px',
                                textAlign: msg.sender === 'You' ? 'right' : 'left',
                            }}
                        >
                            <p
                                style={{
                                    display: 'inline-block',
                                    padding: '10px',
                                    backgroundColor: msg.sender === 'You' ? '#d4edda' : '#f8d7da',
                                    borderRadius: '8px',
                                    maxWidth: '70%',
                                    wordWrap: 'break-word',
                                }}
                            >
                                <strong>{msg.sender}:</strong> {msg.content}
                                <br />
                                <small style={{ fontSize: '10px', color: '#555' }}>
                                    {new Date(msg.timestamp).toLocaleString()}
                                </small>
                            </p>
                        </div>
                    ))
                ) : (
                    <p style={{ color: '#777' }}>Brak wiadomości w tym czacie.</p>
                )}
            </div>
            <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Napisz odpowiedź..."
                style={{
                    width: '100%',
                    height: '80px',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    marginBottom: '10px',
                    fontSize: '14px',
                }}
            ></textarea>
            <button
                onClick={handleSendReply}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
            >
                Wyślij
            </button>
        </div>
    );
};

export default ChatDetails;
