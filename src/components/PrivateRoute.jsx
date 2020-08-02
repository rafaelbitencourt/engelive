import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthService from '../services/auth.service';
import Header from '../components/Header.jsx';

export default ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) {
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        return <React.Fragment>
            <Header showMenu showUserLogout usuario={currentUser} />
            <Component {...props} />
        </React.Fragment>
    }} />
)