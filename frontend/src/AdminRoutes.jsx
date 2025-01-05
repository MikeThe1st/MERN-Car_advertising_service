import { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import axios from 'axios';

const AdminRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await axios.get('http://localhost:3000/backend/user/get-user', { withCredentials: true })
                if (response.data[0].isAdmin) {
                    setIsAuthenticated(true)
                    console.log(response)
                }
            } catch (error) {
                setIsAuthenticated(false)
                console.error('Error verifying JWT:', error)
            } finally {
                setIsLoading(false)
            }
        }

        checkAuthentication()
    }, [])

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />
};

export default AdminRoutes