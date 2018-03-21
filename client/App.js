import React, { Component } from 'react';

import Main from './components/Main';
import NavBar from './components/NavBar';

class App extends Component {

    render() {
        return (
            <div>
                <NavBar/>
                <Main/>
            </div>
        );
    }
}

export default App;