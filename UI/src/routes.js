import { Route, Switch } from 'react-router-dom';
import HomePage from './Pages/Home';
import HolidaysListPage from './Pages/Settings/HolidaysList';
import LeaveCategoriesPage from './Pages/Settings/LeaveCategories';
import LeavesPage from './Pages/Leaves/leaves.page';
import LocationsPage from './Pages/Settings/Locations';

import React, { Component } from 'react';


class AppRoute extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact={true} component={HomePage} />
                <Route path="/holidayslist" exact={true} component={HolidaysListPage} />
                <Route path="/leaveCategories" exact={true} component={LeaveCategoriesPage} />
                <Route path="/leaves" exact={true} component={LeavesPage} />
                <Route path="/locations" exact={true} component={LocationsPage} />
            </Switch>
        );
    }
}

export default AppRoute;