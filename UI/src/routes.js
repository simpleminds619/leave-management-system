import { Route, Switch } from 'react-router-dom';
import HomePage from './Pages/Home';
import AboutPage from './Pages/About/about.page';
import ContactPage from './Pages/Contact/contact.page';
import React, { Component } from 'react';


class AppRoute extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact={true} component={HomePage} />
                <Route path="/about" exact={true} component={AboutPage} />
                <Route path="/contact" exact={true} component={ContactPage} />
            </Switch>
        );
    }
}

export default AppRoute;


