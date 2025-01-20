import React, { useState } from 'react';
import ChatList from '../components/ChatList';
import ChatDetails from './ChatDetails.jsx';

const MessagePage = () => {
    const [selectedChat, setSelectedChat] = useState(null);

    const handleChatSelect = (chat) => {
        setSelectedChat(chat);
    };

    const handleReplySent = () => {
        alert('Odpowiedź została wysłana!');
        setSelectedChat(null); // Opcjonalnie resetuje wybrany czat
    };

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
                <ChatList onSelectChat={handleChatSelect} />
            </div>

            {/* Szczegóły rozmowy po prawej stronie */}
            <div
                style={{
                    flex: 2,
                    background: '#fff',
                    padding: '15px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                }}
            >
                {selectedChat ? (
                    <ChatDetails chat={selectedChat} onReplySent={handleReplySent} />
                ) : (
                    <p style={{ textAlign: 'center', color: '#555' }}>
                        Wybierz czat, aby zobaczyć szczegóły rozmowy.
                    </p>
                )}
            </div>
        </div>
    );
};

export default MessagePage;
