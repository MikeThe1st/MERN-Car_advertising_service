import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/ChatPage.css'; // Add custom styles for the chat page
import Navbar from '../components/Navbar';

const ChatPage = () => {
    const { chatId } = useParams(); // Get chatId from the URL
    const [chat, setChat] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [messageInput, setMessageInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user email
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/backend/user/get-user', { withCredentials: true });
                setUserEmail(response.data[0].email);
            } catch (err) {
                setError('Failed to load user data.');
            }
        };

        fetchUserData();
    }, []);

    // Fetch the chat by ID using POST
    useEffect(() => {
        const fetchChat = async () => {
            if (!userEmail) return; // Wait for userEmail to be fetched

            try {
                const response = await axios.post('http://localhost:3000/backend/chat/get-chat', {
                    chatId,
                    userEmail,
                });
                const chatData = response.data;

                setChat(chatData);
                setLoading(false);
            } catch (err) {
                setError('Failed to load chat.');
                setLoading(false);
            }
        };

        fetchChat();
    }, [chatId, userEmail]); // Run when both chatId and userEmail are available

    // Handle sending a new message
    const sendMessage = async () => {
        if (!messageInput.trim()) return;

        try {
            const response = await axios.post('http://localhost:3000/backend/chat/add-message', {
                chatId,
                sender: userEmail,
                message: messageInput,
            });
            window.location.reload()
            setMessageInput('');
        } catch (err) {
            console.error('Failed to send message:', err);
        }
    };

    if (loading) return <p>Loading chat...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <Navbar />
            <div className="chat-page">
                {chat ? (
                    <>
                        <div className="chat-header">
                            <h4>Chat with {chat.users.find((user) => user !== userEmail)}</h4>
                        </div>
                        <div className="chat-messages">
                            {chat.chat.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`message ${msg.sender === userEmail ? 'sent' : 'received'}`}
                                >
                                    <p>{msg.message}</p>
                                    <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                                </div>
                            ))}
                        </div>
                        {/* Przeniesienie pola do pisania wiadomości poniżej */}
                        <div className="chat-input">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                            />
                            <button onClick={sendMessage}>Send</button>
                        </div>
                    </>
                ) : (
                    <p>No chat data available.</p>
                )}
            </div>
        </div>
    );
};

export default ChatPage;
