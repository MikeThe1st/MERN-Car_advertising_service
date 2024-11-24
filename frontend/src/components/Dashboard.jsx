// src/components/Dashboard.jsx
import React, { useState } from 'react';


import '../css/Dashboard.css';

const Dashboard = () => {
    // Przykładowe dane użytkowników
    const [users, setUsers] = useState([
        { id: 1, name: 'Jan Kowalski', email: 'jan.kowalski@example.com', role: 'User' },
        { id: 2, name: 'Anna Nowak', email: 'anna.nowak@example.com', role: 'Admin' },
        { id: 3, name: 'Tomasz Zieliński', email: 'tomasz.zielinski@example.com', role: 'Moderator' },
    ]);

    // Funkcja zmieniająca rolę użytkownika
    const handleRoleChange = (id, newRole) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === id ? { ...user, role: newRole } : user
            )
        );
    };

    return (
        <div className="dashboard">
            <h2>Witaj w panelu administratora</h2>
            <p>Zarządzaj użytkownikami, zamówieniami, produktami i ustawieniami systemu.</p>

            {/* Widżety */}
            <div className="widgets">
                <div className="widget">Liczba użytkowników: {users.length}</div>
                <div className="widget">Liczba zamówień: 45</div>
                <div className="widget">Dochód: 15 000 PLN</div>
            </div>

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
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <select
                                        value={user.role}
                                        onChange={(e) =>
                                            handleRoleChange(user.id, e.target.value)
                                        }
                                    >
                                        <option value="User">User</option>
                                        <option value="Moderator">Moderator</option>
                                        <option value="Admin">Admin</option>
                                    </select>
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