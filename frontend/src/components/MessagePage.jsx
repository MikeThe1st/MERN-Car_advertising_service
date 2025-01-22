import React, { useState, useEffect } from 'react';
import ChatList from '../components/ChatList';
import ChatDetails from './ChatDetails.jsx';

import axios from 'axios';

const MessagePage = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [userEmail, setUserEmail] = useState("");

    const handleChatSelect = (chat) => {
        setSelectedChat(chat);
    };

    const handleReplySent = () => {
        alert('Odpowiedź została wysłana!');
        setSelectedChat(null); // Opcjonalnie resetuje wybrany czat
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/backend/user/info', { withCredentials: true });
                setUserEmail(response.data.email);

            } catch (err) {
                setError('Failed to load data.');
            } 
        };
        fetchUserData();
    }, []);

    return (
        <div style={{ display: 'flex', gap: '20px', padding: '20px', backgroundColor: '#f9f9f9' }}>
            {/* Lista dymków po lewej stronie */}
            <div
                style={{
                    flex: 1,
                    background: '#fff',
                    padding: '15px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    overflowY: 'auto',
                    maxHeight: '600px',
                }}
            >
                <ChatList onSelectChat={handleChatSelect} providedEmail={userEmail}/>
            </div>
        </div>
    );
};

export default MessagePage;
