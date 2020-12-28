import React from 'react';
import { Route } from 'react-router-dom';
import SignInScreen from '../screens/SignInScreen';

// import { Container } from './styles';

function PublicLayout() {
    return (
        <div className="container-fluid">
            <div className="signin-wraper">
                <Route path="/" component={SignInScreen}></Route>
            </div>
        </div>
    );
}

export default PublicLayout;



