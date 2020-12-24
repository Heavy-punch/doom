import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div class="header">
                <div class="logo">
                    <img src="./images/logo.png" alt="mng" />
                </div>
                <div class="logout">
                    <i class="fa fa-sign-out" aria-hidden="true"></i>
                </div>
            </div>
        );
    }
}

export default Header;

