import React, { Component } from 'react';

import Banner from './components/Banner/Banner';
import Main from './components/Main/Main';

class App extends Component {
    render() {
        return (
            <div>
                <Banner/>
                <Main/>
            </div>
        );
    }
}

export default App;