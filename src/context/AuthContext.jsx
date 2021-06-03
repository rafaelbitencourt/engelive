import React, { createContext, useEffect, useContext } from 'react';
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
    let navigate = useNavigate();

    const [user, login, loading] = useCrossTabState('user', null);

    useEffect(() => {
        if (user) {
            axios.defaults.headers["x-access-token"] = user?.accessToken;
            if (location.state?.from)
                navigate(location.state.from, { replace: true });
        } else {
            delete axios.defaults.headers["x-access-token"];
            if(location.pathname !== "/")
                navigate("/login", { state: { from: location.pathname } });
        }
    }, [user]);

    const logout = () => {
        login(null);
        navigate("/");
    }

    const isSigned = () => !!user;

    if (loading) {
        console.log('carregando')
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
    }

    console.log('carregando22')

    return (
        <AuthContext.Provider value={{ isSigned, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };