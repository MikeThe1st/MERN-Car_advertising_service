import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import '../css/UserList.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:3000/backend/user/get-all-users'); // Zmień URL, jeśli to konieczne
                setUsers(response.data);
            } catch (err) {
                console.error("Error fetching users:", err);
                setError("Nie udało się załadować listy użytkowników.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleToggleStatus = async (userId, currentStatus) => {
        try {
            await axios.post(
                "http://localhost:3000/backend/admin/toggle-user-status",
                { userId, isActive: !currentStatus }
            );
            if (!currentStatus) {
                alert("Użytkownik został pomyślnie aktywowany.");
            } else {
                alert("Użytkownik został pomyślnie dezaktywowany.");
            }
            window.location.reload();
        } catch (err) {
            console.error("Błąd podczas zmiany statusu użytkownika:", err);
            alert("Nie udało się zmienić statusu użytkownika.");
        }
    };

    const handleToggleAdmin = async (userId, currentAdminStatus) => {
        try {
            console.log(userId, currentAdminStatus)
            await axios.post(
                "http://localhost:3000/backend/admin/toggle-permissions",
                { userId, isAdmin: !currentAdminStatus }
            );
            if (!currentAdminStatus) {
                alert("Użytkownik został pomyślnie dodany jako administrator.");
            } else {
                alert("Użytkownik został pomyślnie usunięty z roli administratora.");
            }
            window.location.reload();
        } catch (err) {
            console.error("Błąd podczas zmiany roli administratora:", err);
            alert("Nie udało się zmienić roli administratora.");
        }
    };

    if (loading) return <div className="loading">Ładowanie listy użytkowników...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="user-list">
            <h2>Lista użytkowników</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Imię</th>
                        <th>Email</th>
                        <th>Typ konta</th>
                        <th>Status</th>
                        <th>Administrator</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.sellerType}</td>
                            <td>{user.isActive ? 'Aktywny' : 'Nieaktywny'}</td>
                            <td>{user.isAdmin ? 'Tak' : 'Nie'}</td>
                            <td>
                                <button
                                    className="action-btn m-1"
                                    onClick={() => handleToggleStatus(user._id, user.isActive)}
                                >
                                    {user.isActive ? 'Dezaktywuj konto' : 'Aktywuj konto'}
                                </button>
                                <button
                                    className="action-btn m-1"
                                    onClick={() => handleToggleAdmin(user._id, user.isAdmin)}
                                >
                                    {user.isAdmin ? 'Usuń Admina' : 'Dodaj Admina'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
