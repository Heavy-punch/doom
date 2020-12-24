import React, { Component } from 'react';

class SideBar extends Component {
    render() {
        return (
            <div className="sidenav">
                <a>About</a>
                <a>Services</a>
                <a>Clients</a>
                <a>Contact</a>
            </div>
        );
    }
}

export default SideBar;