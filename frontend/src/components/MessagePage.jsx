import React, { useState, useEffect } from 'react';
import ChatList from '../components/ChatList';
import axios from 'axios';
import '../css/MessagePage.css'; // Importujemy nowy plik CSS

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
                const response = await axios.get('http://localhost:3000/backend/user/get-user', { withCredentials: true });
                setUserEmail(response.data[0].email);

            } catch (err) {
                setError('Failed to load data.');
            } 
        };
        fetchUserData();
    }, []);

    return (
        <div className="message-page">
            {/* Lista dymków po lewej stronie */}
            <div className="chat-list-container">
                <ChatList onSelectChat={handleChatSelect} providedEmail={userEmail}/>
            </div>
        </div>
    );
};

export default MessagePage;
