import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from './Components/Auth/auth';
import Dashboard from './Components/Dashboard/dashboard';
import Form from './Components/Form/form';
import Post from './Components/Post/post';

export default (
    <Switch >
        <Route exact path='/' component={Auth} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/post/:postid' component={Post} />
        <Route path='/new' component={Form} />
    </Switch>
)