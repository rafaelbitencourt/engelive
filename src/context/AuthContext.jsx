import React, { createContext, useState, useEffect, useContext } from 'react';
import {
    Box,
    CircularProgress,
} from '@material-ui/core';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useCrossTabState } from 'hooks';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const location = useLocation();
    const { from } = location.state || { from: "/app/obras" }
    let navigate = useNavigate();

    const [user, login, loading] = useCrossTabState('user', null);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        if (user) {
            setSigned(true);
            axios.defaults.headers["x-access-token"] = user?.accessToken;
            navigate(from, { replace: true });
        } else {
            delete axios.defaults.headers["x-access-token"];
            if (signed) {
                setSigned(false);
                navigate("/login", { state: { from: location.pathname } });
            }
        }
    }, [user]);

    const logout = () => {
        login(null);
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