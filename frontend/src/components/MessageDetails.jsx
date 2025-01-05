// MessageDetails.js
import React, { useState } from 'react';

const MessageDetails = ({ message, onReplySent }) => {
    const [reply, setReply] = useState('');

    if (!message) {
        return <p>Wybierz wiadomość, aby zobaczyć szczegóły.</p>;
    }

    const handleSendReply = () => {
        if (reply.trim()) {
            alert(`Wysłano odpowiedź: ${reply}`);
            setReply('');
            onReplySent();
        } else {
            alert('Treść odpowiedzi nie może być pusta!');
        }
    };

    return (
        <div>
            <h2>{message.title}</h2>
            <p>Treść wiadomości: To jest przykładowa treść dla wiadomości o ID {message.id}.</p>
            
            <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Wpisz odpowiedź..."
                style={{ width: '100%', height: '100px', marginTop: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            ></textarea>
            
            <button
                onClick={handleSendReply}
                style={{ marginTop: '10px', padding: '10px 20px', background: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
                Wyślij odpowiedź
            </button>
        </div>
    );
};

export default MessageDetails;
