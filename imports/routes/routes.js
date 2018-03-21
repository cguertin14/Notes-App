import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router';
import { createBrowserHistory } from 'history';

import SignUp from './../ui/SignUp';
import Dashboard from './../ui/Dashboard';
import NotFound from './../ui/NotFound';
import Login from './../ui/Login';

const browserHistory = window.browserHistory = createBrowserHistory();
const unauthenticatedPages = ['/','/signup'];
const authenticatedPages = ['/dashboard'];
const onEnterPublicPage = (component) => Meteor.userId() ? <Redirect to="/dashboard"/> : component
const onEnterPrivatePage = (component) => !Meteor.userId() ? <Redirect to="/"/> : component;

export const onAuthChange = (isAuthenticated) => {
    const pathname = browserHistory.location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);

    if (isUnauthenticatedPage && isAuthenticated)
        browserHistory.replace('/dashboard');
    else if (isAuthenticatedPage && !isAuthenticated)
        browserHistory.replace('/');
    
    console.log('isAuthenticated',isAuthenticated);
};

export const routes = (
    <Router history={browserHistory}>
        <Switch>
            <Route exact path="/" render={() => onEnterPublicPage(<Login/>)} />
            <Route path="/signup" render={() => onEnterPublicPage(<SignUp/>)} />
            <Route path="/dashboard" render={() => onEnterPrivatePage(<Dashboard/>)} />
            <Route path="*" component={NotFound} />
        </Switch>
    </Router>
);