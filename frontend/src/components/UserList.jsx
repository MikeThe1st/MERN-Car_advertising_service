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

    if (loading) return <div className="loading">Ładowanie listy użytkowników...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="user-list">
            <h2>Lista użytkowników</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Imię</th>
                        <th>Email</th>
                        <th>Data utworzenia</th>
                        <th>Status</th>
                        <th>Akcja</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td>{user.isActive ? 'Aktywny' : 'Nieaktywny'}</td>
                            <td><button
                            variant={user.isActive ? 'danger' : 'success'}
                            onClick={()=>handleToggleStatus(user._id,user.isActive) }
                            >
                                {user.isActive? 'Aktywny' : 'Nieaktywny'}
                                </button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default UserList;
