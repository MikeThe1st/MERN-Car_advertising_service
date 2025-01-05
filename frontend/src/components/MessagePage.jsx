// MessagePage.js
import React, { useState } from 'react';
import MessageList from '../components/MessageList';
import MessageDetails from '../components/MessageDetails';

const MessagePage = () => {
    const [selectedMessage, setSelectedMessage] = useState(null);

    const handleReplySent = () => {
        alert('Odpowiedź została wysłana!');
        setSelectedMessage(null); // Opcjonalne - odznacza wybraną wiadomość
    };

    return (
        <div style={{ display: 'flex', gap: '20px', padding: '20px', backgroundColor: '#f9f9f9' }}>
            <div style={{ flex: 1, background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <MessageList onSelectMessage={setSelectedMessage} />
            </div>
            <div style={{ flex: 2, background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <MessageDetails
                    message={selectedMessage}
                    onReplySent={handleReplySent}
                />
            </div>
        </div>
    );
};

export default MessagePage;
