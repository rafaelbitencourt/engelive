import React, { createContext, useState, useEffect, useContext } from 'react'
import {
    Box,
    CircularProgress,
} from '@material-ui/core';
import { useNavigate, useLocation } from 'react-router-dom'

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const location = useLocation();
    const { from } = location.state || { from: "/app/obras" }
    let navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [signed, setSigned] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const local = localStorage.getItem('user');
        if (local) {
            setUser(JSON.parse(local));
            setSigned(true);
        }
        setLoading(false);
    }, []);

    const login = (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        setSigned(true);
        navigate(from, { replace: true });
    }

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        setSigned(false);
        navigate("/");
    }

    if (loading)
        return <Box
            height='90vh'
            width='100%'
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <CircularProgress />
        </Box>;


    return (
        <AuthContext.Provider value={{ signed, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };