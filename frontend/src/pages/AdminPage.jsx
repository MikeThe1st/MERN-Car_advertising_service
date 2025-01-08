// src/components/AdminPage.jsx
import React from 'react';
import Navbar from "../components/Navbar";
import Dashboard from '../components/Dashboard';
import AdminPanel from '../components/AdminPanel';
import DailyCarsChart from '../components/DailyCarsChart';
import UserList from '../components/UserList';
import '../css/AdminPage.css';
import GearboxCarsChart from '../components/GearboxCarsChart';
import YearlyCarsChart from '../components/YearlyCarsChart';

const AdminPage = () => {
    return (
        <div className="admin-page">
            <Navbar />
            <div className="main-content">
                <h1 className='pb-2'>Witaj w panelu admina! </h1>
                <AdminPanel />
                <UserList />
                <DailyCarsChart />
                <GearboxCarsChart />

            </div>
        </div>
    );
};

export default AdminPage;
