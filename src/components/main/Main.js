import React, { Component } from 'react';
import Content from '../Content';
import SideBar from '../SideBar';

class Main extends Component {
    render() {
        return (
            <main className="main">
                <SideBar />
                <Content />
            </main>
        );
    }
}

export default Main;





