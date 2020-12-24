import React from 'react';
import { Route } from 'react-router-dom';
import SignInScreen from '../screens/SignInScreen';

// import { Container } from './styles';

function PublicLayout() {
    return (
        <div>
            <p>public</p>
            <Route path="/" component={SignInScreen}></Route>
        </div>
    );
}

export default PublicLayout;