// MessageList.js
import React from 'react';

const MessageList = ({ onSelectMessage }) => {
    const messages = [
        { id: 1, title: 'Wiadomość 1' },
        { id: 2, title: 'Wiadomość 2' },
        { id: 3, title: 'Wiadomość 3' },
    ];

    return (
        <ul>
            {messages.map((message) => (
                <li 
                    key={message.id} 
                    style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ccc' }}
                    onClick={() => onSelectMessage(message)}
                >
                    {message.title}
                </li>
            ))}
        </ul>
    );
};

export default MessageList;
