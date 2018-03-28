import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Session } from 'meteor/session';
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
const onEnterNotePage = (component, nextState) => {
    if (!Meteor.userId()) {
        return <Redirect to="/"/>;
    } else {
        Session.set('selectedNoteId', nextState.params.id)
        return component;
    }
};

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
            <Route exact path="/dashboard" render={() => onEnterPrivatePage(<Dashboard/>)} />
            <Route path="/dashboard/:id" render={(nextState) => onEnterNotePage(<Dashboard/>, nextState.match)} />
            <Route path="*" component={NotFound} />
        </Switch>
    </Router>
);