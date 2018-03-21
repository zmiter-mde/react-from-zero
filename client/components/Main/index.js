import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';

import Login from '../Login';
import ImageUpload from '../ImageUpload';

class Main extends Component {

    render() {
        return <Switch>
            <Route exact path={'/'} component={ImageUpload} />
            <Route exact path={'/login'} component={Login} />
            <Route exact path={'/upload'} component={ImageUpload} />
        </Switch>
    }

}

export default Main;