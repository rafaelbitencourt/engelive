import React, { createContext, useContext, useState, useCallback } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

const NotificationContext = createContext({});

const NotificationProvider = ({ children }) => {
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notification, setNotification] = useState({});

    const setError = useCallback((message) => {
        setNotification({ severity: "error", message });
        setNotificationOpen(true);
    }, [setNotification, setNotificationOpen]);

    const setWarning = useCallback((message) => {
        setNotification({ severity: "warning", message });
        setNotificationOpen(true);
    }, [setNotification, setNotificationOpen]);

    const setSuccess = useCallback((message) => {
        setNotification({ severity: "success", message });
        setNotificationOpen(true);
    }, [setNotification, setNotificationOpen]);

    return (
        <NotificationContext.Provider value={{ setError, setSuccess, setWarning }}>
            {children}
            <Snackbar
                anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
                open={notificationOpen}
                autoHideDuration={notification.severity === "error" ? null : 4000 }
                onClose={() => setNotificationOpen(false)}>
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={() => setNotificationOpen(false)}
                    severity={notification.severity}
                >
                    {notification.message}
                </MuiAlert>
            </Snackbar>
        </NotificationContext.Provider>
    );
}

const useNotification = () => useContext(NotificationContext);

export { useNotification, NotificationProvider };