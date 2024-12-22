// src/components/Dashboard.jsx
import React, { useState } from 'react';


import '../css/Dashboard.css';

const Dashboard = () => {
    // Przykładowe dane użytkowników
    const [users, setUsers] = useState([
        { id: 1, name: 'Jan Kowalski', email: 'jan.kowalski@example.com', role: 'User', isActive: true },
        { id: 2, name: 'Anna Nowak', email: 'anna.nowak@example.com', role: 'Admin', isActive: true },
        { id: 3, name: 'Tomasz Zieliński', email: 'tomasz.zielinski@example.com', role: 'Moderator', isActive: true },
    ]);

    // Funkcja zmieniająca rolę użytkownika
    const handleRoleChange = (id, newRole) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === id ? { ...user, role: newRole } : user
            )
        );
    };

    // Funkcja do usuwania użytkownika (dezaktywacji)
    const handleRemoveUser = (id) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === id ? { ...user, isActive: false } : user
            )
        );
    };

    // Funkcja do przywracania użytkownika (aktywacji)
    const handleRestoreUser = (id) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === id ? { ...user, isActive: true } : user
            )
        );
    };

    return (
        <div className="dashboard">
            <h2>Witaj w panelu administratora</h2>\
            
            <p>Zarządzaj użytkownikami, zamówieniami, produktami i ustawieniami systemu.</p>

          

            {/* Tabela użytkowników */}
            <div className="user-management">
                <h3>Zarządzanie użytkownikami</h3>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Imię i nazwisko</th>
                            <th>Email</th>
                            <th>Rola</th>
                            <th>Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className={!user.isActive ? 'inactive-user' : ''}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <select
                                        value={user.role}
                                        onChange={(e) =>
                                            handleRoleChange(user.id, e.target.value)
                                        }
                                        disabled={!user.isActive}
                                    >
                                        <option value="User">User</option>
                                        <option value="Moderator">Moderator</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </td>
                                <td>
                                    {user.isActive ? (
                                        <button
                                            className="remove-button"
                                            onClick={() => handleRemoveUser(user.id)}
                                        >
                                            Usuń
                                        </button>
                                    ) : (
                                        <button
                                            className="restore-button"
                                            onClick={() => handleRestoreUser(user.id)}
                                        >
                                            Przywróć
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;