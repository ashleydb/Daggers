//Include our npm dependencies
import React from 'react';
import ReactDOM from 'react-dom';
var {Provider} = require('react-redux');

//Creates multiple variables at once in ES6 destructuring syntax
// Same as var Route = require('react-router').Route; repeated for each item in the list.
import { Route, Router, IndexRoute, browserHistory } from 'react-router';

//Include our component dependencies
import Main from 'Main';
import Home from 'Home';
import News from 'News';
import NewsStory from 'NewsStory';
import NewsEdit from 'NewsEdit';
import Fixtures from 'Fixtures';
import FixturesEdit from 'FixturesEdit';
import Admin from 'Admin';
import PagesEdit from 'PagesEdit';
import Tickets from 'Tickets';
import Team from 'Team';
import Fans from 'Fans';
import Club from 'Club';
import Commercial from 'Commercial';

import * as NewsAPI from 'NewsAPI';

import {actions} from 'actions';
var store = require('configureStore').configure();

// TODO: Move this to the Home or News components?
store.dispatch(actions.news.fetchNewsStoriesIfNeeded());

//App css
require('applicationStyles');

// TODO: Need a NoMatch route for 404?

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <Route path="news" component={News}>
          <Route path=":newsId" component={NewsStory}/>
        </Route>
        <Route path="fixtures" component={Fixtures}/>
        <Route path="tickets" component={Tickets}/>
        <Route path="team" component={Team}/>
        <Route path="fans" component={Fans}/>
        <Route path="club" component={Club}/>
        <Route path="commercial" component={Commercial}/>
          
        <Route path="admin">
            <IndexRoute component={Admin}/>
            <Route path="news" component={NewsEdit}>
                <Route path=":newsId" component={NewsEdit}/>
            </Route>
            <Route path="fixtures" component={FixturesEdit}>
                <Route path=":fixtureId" component={FixturesEdit}/>
            </Route>
            <Route path="pages" component={PagesEdit}>
                <Route path=":pageId" component={PagesEdit}/>
            </Route>
        </Route>
        <IndexRoute component={Home}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);

//Use jQuery to start foundation
$(document).ready(function($) {
    $(document).foundation();
});
