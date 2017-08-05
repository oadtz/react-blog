import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PostCreate from 'PostCreate';
import PostView from 'PostView';
import PostEdit from 'PostEdit';
import Home from 'Home';
import session from '../utils/session';

// Clear cached of posts when load the app
session.remove ('posts');

class App extends Component {
    render () {
        return (
            <Router>
                <Switch>
                    <Route exact path="/post/new" component={PostCreate} />
                    <Route exact path="/post/:post" component={PostView} />
                    <Route exact path="/post/:post/edit" component={PostEdit} />
                    <Route component={Home} />
                </Switch>
            </Router>
        );
    }
}

export default App;