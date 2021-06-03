import React, { createContext, useEffect, useContext } from 'react';
import {
    Box,
    CircularProgress,
} from '@material-ui/core';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCrossTabState } from 'hooks';
import {
    setTokenApi,
    setInterceptorExpiresApi
} from 'services/api';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    let navigate = useNavigate();
    const location = useLocation();

    const [user, setUser, loading] = useCrossTabState('user', null);

    useEffect(() => setInterceptorExpiresApi(resetUser));

    useEffect(() => {
        if (user) {
            setTokenApi(user?.accessToken);
            if (location.state?.from)
                navigate(location.state.from, { replace: true });
        } else {
            setTokenApi(undefined);
            if (location.pathname !== "/")
                navigate("/login", { state: { from: location.pathname } });
        }
    }, [user, navigate]);

    const resetUser = () => {
        setUser(null);
    }

    const logout = () => {
        setUser(null);
        navigate("/");
    }

    const isSigned = () => !!user;

    if (loading) {
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

    return (
        <AuthContext.Provider value={{ isSigned, user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };