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
                    params: { providedEmail },
                });
                setChats(response.data);
            } catch (err) {
                setError('Failed to load chats.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (providedEmail) {
            fetchChats();
        }
    }, [providedEmail]);

    if (loading) {
        return <p>Loading chats...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Sprawdź swoje wiadomości</h2>
            <div>
                {chats.map((chat) => (
                    <Link
                        to={`/ChatPage/${chat.id}`} // Navigate to the specific chat page using chat ID
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
                        <p style={{ margin: 0, fontSize: '14px', color: '#777' }}>{chat.lastMessage.message}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ChatList;
