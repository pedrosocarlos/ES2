import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LogonU from './pages/LogonUser';
import RegisterU from './pages/RegisterUser';
import ProfileR from './pages/ProfileRest';
import NewItem from './pages/NewItem';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={LogonU} />
                <Route path="/registerU" component={RegisterU} />
                <Route path="/profileRest" component={ProfileR} />
                <Route path="/menu/new" component={NewItem} />
            </Switch>
        </BrowserRouter>
    );
}