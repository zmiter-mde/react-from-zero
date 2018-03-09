import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';

import Banner from './components/Banner';
import Main from './components/Main';

class App extends Component {
    render() {
        return (
            <div>
                <AppBar title="Order your poster now!"
                        onLeftIconButtonClick={() => {console.log('Hi, it is a left button icon click')}}/>
                <Banner/>
                <Main/>
            </div>
        );
    }
}

export default App;