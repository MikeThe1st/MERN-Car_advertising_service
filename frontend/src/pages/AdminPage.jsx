// src/components/AdminPage.jsx
import React from 'react';
import Navbar from "../components/Navbar";
import Dashboard from '../components/Dashboard';
import AdminPanel from '../components/AdminPanel';
import DailyCarsChart from '../components/DailyCarsChart';
import UserList from '../components/UserList';
import '../css/AdminPage.css';

const AdminPage = () => {
    return (
        <div className="admin-page">
            <Navbar />
            <div className="main-content">
                <h1 className='pb-2'>Witaj w panelu admina! </h1>
                <AdminPanel />
                <DailyCarsChart />
                <UserList />
            </div>
        </div>
    );
};

export default AdminPage;
