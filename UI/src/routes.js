import { Route, Switch } from 'react-router-dom';
import HomePage from './Pages/Home';
import ContactPage from './Pages/Contact/contact.page';
import HolidaysListPage from './Pages/Settings/HolidaysList/holidaysList.page';
import LeaveCategoriesPage from './Pages/Settings/LeaveCategories';

import React, { Component } from 'react';


class AppRoute extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact={true} component={HomePage} />
                <Route path="/contact" exact={true} component={ContactPage} />
                <Route path="/holidayslist" exact={true} component={HolidaysListPage} />
                <Route path="/leaveCategories" exact={true} component={LeaveCategoriesPage} />
            </Switch>
        );
    }
}

export default AppRoute;


