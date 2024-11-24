// src/components/AdminPage.jsx
import React from 'react';
import Navbar from "../components/Navbar";
import Dashboard from '../components/Dashboard';
import '../css/AdminPage.css';

const AdminPage = () => {
    return (
        <div className="admin-page">
          <Navbar/>
            <div className="main-content">
             
                <Dashboard />
            </div>
        </div>
    );
};

export default AdminPage;
