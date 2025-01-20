import React from 'react';

const ChatList = ({ onSelectChat }) => {
    // Przykładowe dane
    const chats = [
        { id: 1, name: 'Jan Kowalski', lastMessage: 'Cześć, jak się masz?' },
        { id: 2, name: 'Anna Nowak', lastMessage: 'Potrzebuję pomocy z zamówieniem.' },
        { id: 3, name: 'Piotr Wiśniewski', lastMessage: 'Dziękuję za szybką odpowiedź.' },
    ];

    return (
        <div>
            {chats.map((chat) => (
                <div
                    key={chat.id}
                    onClick={() => onSelectChat(chat)}
                    style={{
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
                    <h4 style={{ margin: 0, fontSize: '16px', color: '#333' }}>{chat.name}</h4>
                    <p style={{ margin: 0, fontSize: '14px', color: '#777' }}>{chat.lastMessage}</p>
                </div>
            ))}
        </div>
    );
};

export default ChatList;
