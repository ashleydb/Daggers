//Include our npm dependencies
var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');

//Creates multiple variables at once in ES6 destructuring syntax
// Same as var Route = require('react-router').Route; repeated for each item in the list.
var {Route, Router, IndexRoute, browserHistory} = require('react-router');

//Include our component dependencies
var Main = require('Main');
//var Home = require('Home'); // This is the React version of the Home component. Would only want this for testing. require() is a webpack convention.
//import {Home} from 'Home';  // This is the React version of the Home component. Would only want this for testing. import is an ES6 cnovention.
import Home from 'Home';      // This is the Redux version of the Home component
import News from 'News';
import NewsStory from 'NewsStory';
import NewsEdit from 'NewsEdit';
import Fixtures from 'Fixtures';
import FixturesEdit from 'FixturesEdit';
import Admin from 'Admin';
var Tickets = require('Tickets');
var Team = require('Team');
var Fans = require('Fans');
var Club = require('Club');
var Commercial = require('Commercial');

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
