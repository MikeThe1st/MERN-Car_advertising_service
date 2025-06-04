import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ChatList = ({ providedEmail }) => {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.get('http://localhost:3000/backend/chat/user-chats', {
                    withCredentials: true 
                });
                setChats(response.data);
            } catch (err) {
                // Enhanced error handling to display backend message if available
                const errorMessage = err.response?.data?.msg || 'Failed to load chats.';
                setError(errorMessage);
                console.error('Error fetching chats:', err);
            } finally {
                setLoading(false);
            }
        };

        if (providedEmail) { 
            fetchChats();
        } else {
            setLoading(false); 
        }
    }, [providedEmail]);

    if (loading) {
        return <p>Ładowanie czatów...</p>;
    }

    if (error) {
        return <p>Wystąpił błąd: {error}</p>;
    }

    if (chats.length === 0) {
        return (
            <div>
                <h2>Sprawdź swoje wiadomości</h2>
                <p>Brak wiadomości.</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Sprawdź swoje wiadomości</h2>
            <div>
                {chats.map((chat) => (
                    <Link
                        to={`/ChatPage/${chat.id}`}
                        key={chat.id}
                        style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            display: 'block',
                            padding: '10px 15px',
                            marginBottom: '10px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            backgroundColor: '#f4f4f4',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                            transition: 'background 0.3s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f4f4f4')}
                    >
                        <h4 style={{ margin: 0, fontSize: '16px', color: '#333' }}>{chat.otherUser}</h4>
                        <p style={{ margin: 0, fontSize: '14px', color: '#777' }}>
                            {chat.lastMessage ? chat.lastMessage.message : "Brak wiadomości w czacie."}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ChatList;