import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';

import Banner from '../Banner';

class NavBar extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            logged: false
        };
        this.goToLogin = this.goToLogin.bind(this);
    }

    render() {
        return <div>
            <AppBar title="Order your poster now!"
                    iconElementRight={this.state.logged ? null : <FlatButton label="Login" onClick={this.goToLogin}/>}>


            </AppBar>

            <Banner/>
        </div>;
    }

    goToLogin() {
        this.props.history.push('login');
    }

}

export default withRouter(NavBar);