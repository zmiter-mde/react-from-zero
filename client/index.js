import React from 'react';
import ReactDOM from 'react-dom';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './shared/globals.scss';

import App from './App';

const Container = () => {
    return <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <App/>
    </MuiThemeProvider>
};

ReactDOM.render(<Container/>, document.getElementById('root'));